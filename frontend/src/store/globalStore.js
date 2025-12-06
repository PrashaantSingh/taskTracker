// <<---THIS IS ZUSTAND STORE FOR THE STATE MANAGEMENT OF THE APPLICATION-->>

// I USED THIS BECAUSE THIS WAS SIMPLE TO SETUP AND I WANTED TO KEEP THE STATE MANAGEMENT LOGIC IN A CENTRAL PLACE

import { create } from "zustand";
const tasksData = [
  {
    id: 1,
    title: "Design login page UI",
    description: "Create the layout and responsive UI for the login screen",
    status: "pending",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Fix API integration bug",
    description:
      "Resolve the error occurring during POST request for task creation",
    status: "completed",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Write documentation",
    description: "Add project setup and usage instructions to README file",
    status: "pending",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Create task filtering logic",
    description: "Implement filter buttons for All, Completed, and Pending",
    status: "completed",
    isCompleted: true,
  },
  {
    id: 5,
    title: "Implement task edit feature",
    description: "Allow users to update title and description",
    status: "pending",
    isCompleted: false,
  },
  {
    id: 6,
    title: "Optimize page layout for mobile",
    description: "Make TaskList responsive using CSS framework",
    status: "pending",
    isCompleted: false,
  },
];

//   tasks: IT HOLDS ALL THE TASKS THAT THE USER HAVE,
//   filteredTasks: THIS CONTAINS THE TASKS THAT MEETS THE FILTERING CRITERIA,
//   selectedTaskId: HOLDS THE ID OF THE TASK THAT WAS CLICKED IN ORDER TO DISPLAY THE TASK DETAILS ,
//   selectedTaskToUpdate: THIS HOLDS THE ID OF THE TASK THAT IS BEING UPDATED,
//   currentFilter: HOLDS THE VALUE OF THE CURRENT FILTER FOR TASK FILTEREING,
//   AddTaskInputOverlay: A BOOLEAN TO CHECK IF THE ADD NEW TASK FORM IS VISIBLE OR NOT,
//   UpdateTaskInputOverlay: A BOOLEAN TO CHECK IF THE UPDATE TASK FORM IS VISIBLE OR NOT,

const useGlobaStore = create((set) => ({
  tasks: tasksData,
  filteredTasks: tasksData,
  selectedTaskId: null,
  selectedTaskToUpdate: null,
  currentFilter: "All",
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

  addTask: (data) => {
    set((store) => {
      const newTask = {
        ...data,
        status: "pending",
        id: Date.now(),
        isCompleted: false,
      };
      const updatedTasks = [...store.tasks, newTask];
      const filter = store.currentFilter.toLowerCase();
      return {
        tasks: updatedTasks,
        filteredTasks:
          filter === "all"
            ? updatedTasks
            : updatedTasks.filter((t) => t.status == filter),
      };
    });
  },
  deleteTask: (id) => {
    set((store) => {
      const updatedTasks = store.tasks.filter((t) => t.id !== id);
      const filter = store.currentFilter.toLowerCase();
      return {
        tasks: updatedTasks,
        filteredTasks:
          filter === "all"
            ? updatedTasks
            : updatedTasks.filter((t) => t.status == filter),
      };
    });
  },
  updateTask: (updatedTask, id) =>
    set((store) => {
      const updatedTasks = store.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              title: updatedTask.title,
              description: updatedTask.description,
            }
          : t
      );
      const filter = store.currentFilter.toLowerCase();
      return {
        tasks: updatedTasks,
        filteredTasks:
          filter === "all"
            ? updatedTasks
            : updatedTasks.filter((t) => t.status === filter),
      };
    }),
  markTaskCompleted: (id) =>
    set((store) => {
      const task = store.tasks.find((t) => t.id === id);
      const updatedTask = {
        ...task,
        status: "completed",
        isCompleted: true,
      };

      const remainingTasks = store.tasks.filter((t) => t.id !== id);

      const newTasks = [...remainingTasks, updatedTask];
      const filter = store.currentFilter.toLowerCase();

      return {
        tasks: newTasks,
        filteredTasks:
          filter === "all"
            ? newTasks
            : newTasks.filter((t) => t.status === filter),
      };
    }),
}));

export default useGlobaStore;
