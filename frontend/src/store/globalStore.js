// <<---THIS IS ZUSTAND STORE FOR THE STATE MANAGEMENT OF THE APPLICATION-->>

// I USED THIS BECAUSE THIS WAS SIMPLE TO SETUP AND I WANTED TO KEEP THE STATE MANAGEMENT LOGIC IN A CENTRAL PLACE

import { create } from "zustand";
import { taskService } from "../services/taskService";

//   tasks: IT HOLDS ALL THE TASKS THAT THE USER HAVE,
//   filteredTasks: THIS CONTAINS THE TASKS THAT MEETS THE FILTERING CRITERIA,
//   selectedTaskId: HOLDS THE ID OF THE TASK THAT WAS CLICKED IN ORDER TO DISPLAY THE TASK DETAILS ,
//   selectedTaskToUpdate: THIS HOLDS THE ID OF THE TASK THAT IS BEING UPDATED,
//   currentFilter: HOLDS THE VALUE OF THE CURRENT FILTER FOR TASK FILTEREING,
//   AddTaskInputOverlay: A BOOLEAN TO CHECK IF THE ADD NEW TASK FORM IS VISIBLE OR NOT,
//   UpdateTaskInputOverlay: A BOOLEAN TO CHECK IF THE UPDATE TASK FORM IS VISIBLE OR NOT,

const useGlobaStore = create((set, get) => ({
  tasks: [],
  filteredTasks: [],
  selectedTaskId: null,
  selectedTaskToUpdate: null,
  currentFilter: "All",
  loading: {
    fetchTasks: false,
    addTask: false,
    updateTask: false,
    deleteTask: false,
    markComplete: false,
  },
  errors: {
    fetchTasks: null,
    addTask: null,
    updateTask: null,
    deleteTask: null,
    markComplete: null,
  },
  AddTaskInputOverlay: false,
  UpdateTaskInputOverlay: false,
  setSelectedTaskId: (id) => {
    set(() => ({ selectedTaskId: id }));
  },
  setSelectedTaskToUpdate: (id) => {
    set(() => ({ selectedTaskToUpdate: id }));
  },
  showTaskInput: () => set({ AddTaskInputOverlay: true }),
  hideTaskInput: () =>
    set({ AddTaskInputOverlay: false, selectedTaskId: null }),
  showTaskUpdateInput: () => set({ UpdateTaskInputOverlay: true }),
  hideTaskUpdateInput: () =>
    set({ UpdateTaskInputOverlay: false, selectedTaskToUpdate: null }),
  hideTaskDetails: () => set({ selectedTaskId: null }),
  setCurrentFilter: (filter) => set({ currentFilter: filter }),
  setFilteredTasks: () =>
    set((state) => {
      const filter = state.currentFilter.toLowerCase();

      if (filter === "all") {
        return { filteredTasks: state.tasks };
      }

      return {
        filteredTasks: state.tasks.filter((t) => t.status === filter),
      };
    }),

  //API Related methods/functions
  fetchTasks: async () => {
    try {
      set((state) => ({
        loading: { ...state.loading, fetchTasks: true },
        errors: { ...state.errors, fetchTasks: null },
      }));
      const tasks = await taskService.getTasks();
      set({ tasks });
      get().setFilteredTasks();
    } catch (err) {
      console.error(err);
      set((state) => ({
        errors: {
          ...state.errors,
          fetchTasks: err.message || "Failed to load tasks",
        },
      }));
    } finally {
      set((state) => ({
        loading: { ...state.loading, fetchTasks: false },
      }));
    }
  },
  addTask: async (data) => {
    set((state) => ({
      loading: { ...state.loading, addTask: true },
      errors: { ...state.errors, addTask: null },
    }));
    try {
      const newTask = await taskService.addTask(data);
      set({ tasks: [...get().tasks, newTask] });
      get().setFilteredTasks();
      return true;
    } catch (error) {
      console.error("Error in adding task", error);
      set((state) => ({
        errors: {
          ...state.errors,
          addTask: error.message || "Failed to add task",
        },
      }));
      return false;
    } finally {
      set((state) => ({
        loading: { ...state.loading, addTask: false },
      }));
    }
  },
  deleteTask: async (id) => {
    set((state) => ({
      loading: { ...state.loading, deleteTask: true },
      errors: { ...state.errors, deleteTask: null },
    }));
    try {
      await taskService.deleteTask(id);

      set({ tasks: get().tasks.filter((t) => t.id !== id) });
      get().setFilteredTasks();
    } catch (err) {
      console.error("Error in deleting task:", err);
      set((state) => ({
        errors: {
          ...state.errors,
          deleteTask: err.message || "Failed to delete task",
        },
      }));
    } finally {
      set((state) => ({
        loading: { ...state.loading, deleteTask: false },
      }));
    }
  },
  updateTask: async (updatedTask, id) => {
    set((state) => ({
      loading: { ...state.loading, updateTask: true },
      errors: { ...state.errors, updateTask: null },
    }));
    try {
      const updated = await taskService.updateTask(id, updatedTask);

      set({
        tasks: get().tasks.map((t) => (t.id === id ? updated : t)),
      });
      get().setFilteredTasks();
      return true;
    } catch (err) {
      console.error("Error updating Task:", err);
      set((state) => ({
        errors: {
          ...state.errors,
          updateTask: err.message || "Failed to update task",
        },
      }));
      return false;
    } finally {
      set((state) => ({
        loading: { ...state.loading, updateTask: false },
      }));
    }
  },
  markTaskCompleted: async (id) => {
    set((state) => ({
      loading: { ...state.loading, markComplete: true },
      errors: { ...state.errors, markComplete: null },
    }));
    try {
      const updatedTask = await taskService.markCompleted(id);

      const updatedTasks = [
        ...get().tasks.filter((t) => t.id !== id),
        updatedTask,
      ];

      set({ tasks: updatedTasks });
      get().setFilteredTasks();
    } catch (err) {
      console.error("Error in marking task Completed:", err);
      set((state) => ({
        errors: {
          ...state.errors,
          markComplete: err.message || "Failed to mark task completed",
        },
      }));
    } finally {
      set((state) => ({
        loading: { ...state.loading, markComplete: false },
      }));
    }
  },
}));

export default useGlobaStore;
