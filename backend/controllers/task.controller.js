import { readData, writeData } from "../utils/fileHandler.js";

export const getTasks = (req, res) => {
  try {
    const data = readData();
    return res.status(200).json(data.tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const addTask = (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const data = readData();

    const newTask = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
      status: "pending",
    };

    data.tasks.push(newTask);
    writeData(data);

    return res.status(201).json(newTask);
  } catch (err) {
    console.error("Error adding task:", err);
    return res.status(500).json({ error: "Failed to add task" });
  }
};

export const updateTask = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, isCompleted, status } = req.body;

    const data = readData();
    const index = data.tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    data.tasks[index] = {
      ...data.tasks[index],
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(isCompleted !== undefined ? { isCompleted } : {}),
      ...(status !== undefined ? { status } : {}),
    };

    writeData(data);

    return res.status(200).json(data.tasks[index]); // 200 OK
  } catch (err) {
    console.error("Error updating task:", err);
    return res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = readData();

    const exists = data.tasks.some((task) => task.id === id);
    if (!exists) {
      return res.status(404).json({ error: "Task not found" });
    }

    data.tasks = data.tasks.filter((task) => task.id !== id);
    writeData(data);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    return res.status(500).json({ error: "Failed to delete task" });
  }
};

export const markCompleted = (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = readData();

    const task = data.tasks.find((task) => task.id === id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.isCompleted = true;
    task.status = "completed";

    writeData(data);

    return res.status(200).json(task);
  } catch (err) {
    console.error("Error marking task completed:", err);
    return res.status(500).json({ error: "Failed to update task status" });
  }
};
