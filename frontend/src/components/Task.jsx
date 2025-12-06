import { TiDeleteOutline } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import useGlobaStore from "../store/globalStore";

export default function Task({ title, id, status, handleTaskClick,isCompleted }) {
  const { deleteTask, showTaskUpdateInput, setSelectedTaskToUpdate } =
    useGlobaStore();

  function handleEditClick(e) {
    e.stopPropagation();
    setSelectedTaskToUpdate(id);
    showTaskUpdateInput();
  }

  function handleRemoveClick(e) {
    e.stopPropagation();
    deleteTask(id);
  }

  return (
    <div
      onClick={handleTaskClick}
      className={`border border-gray-200 rounded-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 bg-white shadow-sm cursor-pointer transition-all hover:border-gray-300 ${
        isCompleted ? "grayscale opacity-80" : ""
      }`}
    >
      <div className="flex flex-col gap-1 text-left w-full">
        <h2 className="text-base font-semibold text-gray-900 wrap-break-word leading-snug">
          {title}
        </h2>
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${
            status === "completed" ? "text-emerald-600" : "text-amber-600"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xl text-gray-500 w-full sm:w-auto justify-between sm:justify-end">
        <TiDeleteOutline
          onClick={handleRemoveClick}
          className="cursor-pointer hover:text-red-600"
        />
        <MdEdit
          onClick={handleEditClick}
          className="cursor-pointer hover:text-gray-700"
        />
      </div>
    </div>
  );
}
