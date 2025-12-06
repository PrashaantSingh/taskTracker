import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => res.json({ message: "server is running.." }));
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
