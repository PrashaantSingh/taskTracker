const BASE_URL = "http://localhost:3000/api/tasks";

export const taskService = {
  getTasks: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  addTask: async (task) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  },

  updateTask: async (id, task) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  deleteTask: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
  },

  markCompleted: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/complete`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to mark task completed");
    return res.json();
  },
};
