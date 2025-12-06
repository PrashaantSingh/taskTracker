// <<---THIS IS ZUSTAND STORE FOR THE STATE MANAGEMENT OF THE APPLICATION-->>

// I USED THIS BECAUSE THIS WAS SIMPLE TO SETUP AND I WANTED TO KEEP THE STATE MANAGEMENT LOGIC IN A CENTRAL PLACE

import { create } from "zustand";
import { taskService } from "../../services/taskService";

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
  loading: false,
  error: null,
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

  //API Actions
  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });
      const tasks = await taskService.getTasks();
      set({ tasks });
      get().setFilteredTasks();
    } catch (err) {
      console.error("Fetch Tasks Error:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  addTask: async (data) => {
    set({ loading: true, error: null });
    try {
      const newTask = await taskService.addTask(data);
      set({ tasks: [...get().tasks, newTask] });
      get().setFilteredTasks();
    } catch (error) {
      console.error("Error in adding task", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  deleteTask: async (id) => {
    try {
      set({ loading: true, error: null });
      await taskService.deleteTask(id);

      set({ tasks: get().tasks.filter((t) => t.id !== id) });
      get().setFilteredTasks();
    } catch (err) {
      console.error("Error in deleting task:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  updateTask: async (updatedTask, id) => {
    try {
      set({ loading: true, error: null });
      const updated = await taskService.updateTask(id, updatedTask);

      set({
        tasks: get().tasks.map((t) => (t.id === id ? updated : t)),
      });
      get().setFilteredTasks();
    } catch (err) {
      console.error("Error updating Task:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  markTaskCompleted: async (id) => {
    try {
      set({ loading: true, error: null });
      const updatedTask = await taskService.markCompleted(id);

      const updatedTasks = [
        ...get().tasks.filter((t) => t.id !== id),
        updatedTask,
      ];

      set({ tasks: updatedTasks });
      get().setFilteredTasks();
    } catch (err) {
      console.error("Error in marking task Completed:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useGlobaStore;
