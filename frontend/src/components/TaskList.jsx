import useGlobaStore from "../store/globalStore";
import Task from "./Task";

export default function TaskList() {
  const { filteredTasks, setSelectedTaskId, tasks, currentFilter } =
    useGlobaStore();

  // SORTING THE TASKS
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    //making sure the pending task is at the top
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    // making the newly added task to appear at the top
    if (!a.isCompleted && !b.isCompleted) {
      return b.id - a.id;
    }
    //  making the newly completed task to sit at the bottom
    return a.id - b.id;
  });

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-4 bg-white/70 rounded-2xl shadow-sm w-full min-h-[500px]">
      {/* SHOWING A MESSAGE WHEN THERE'S NO TASKS TO SHOW (EITHER NO TASK AT ALL OR NO TASK THAT MEETS THE FILTER CRITERIA) ELSE SHOWING THE TASKS*/}
      {tasks.length == 0 ? (
        <p className="text-center">
          No Tasks found. Click the <span className="font-bold">New Task</span>{" "}
          button to add new tasks.
        </p>
      ) : filteredTasks.length == 0 ? (
        <p className="text-center">
          No <span className="font-bold">{currentFilter}</span> Tasks
        </p>
      ) : (
        sortedTasks.map((t) => (
          //CREATING TASK COMPONENT FOR EACH TASK
          <Task
            key={t.id}
            title={t.title}
            id={t.id}
            isCompleted={t.isCompleted}
            status={t.status}
            handleTaskClick={() => {
              setSelectedTaskId(t.id);
            }}
          />
        ))
      )}
    </div>
  );
}
