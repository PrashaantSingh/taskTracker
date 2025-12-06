import useGlobaStore from "../store/globalStore";
import Button from "./Button";

export default function TaskHeader() {
  const { setCurrentFilter, setFilteredTasks, showTaskInput } = useGlobaStore();
  function handleFilterSelect(e) {
    setCurrentFilter(e.target.value);
    setFilteredTasks();
  }

  function handleNewTaskClick() {
    showTaskInput();
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 mt-4 w-full">
      <div className="border-2 rounded-md w-full sm:w-auto">
        <select
          className="border-none outline-none px-3 py-2 cursor-pointer w-full text-sm sm:text-base"
          name="filter"
          id="filter"
          onChange={handleFilterSelect}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <div className="w-full sm:w-auto flex sm:justify-end">
        <Button
          handleClick={handleNewTaskClick}
          type="primary"
          className="w-full sm:w-auto"
        >
          New Task
        </Button>
      </div>
    </div>
  );
}
