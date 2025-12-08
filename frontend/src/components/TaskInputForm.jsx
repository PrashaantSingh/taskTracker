import { useEffect, useRef, useState } from "react";
import useGlobaStore from "../store/globalStore";
import Button from "./Button";
import DarkOverlay from "./DarkOverlay";

export default function TaskInputForm({ variant }) {
  const {
    addTask,
    updateTask,
    hideTaskInput,
    hideTaskUpdateInput,
    AddTaskInputOverlay,
    UpdateTaskInputOverlay,
    selectedTaskToUpdate,
    filteredTasks,
    setSelectedTaskToUpdate,
    errors: { addTask: addTaskError, updateTask: updateTaskError },
    loading: { addTask: isAddingTask, updateTask: isUpdatingTask },
  } = useGlobaStore();

  console.log(addTaskError);

  const emptyState = { title: "", description: "" };

  const [taskFormData, setTaskFormData] = useState(emptyState);

  const titleRef = useRef();

  //FOCUS THE FORM INPUT WHEN THE FORM IS DISPLAYED
  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, [AddTaskInputOverlay, UpdateTaskInputOverlay]);

  //DYNAMICALLY SETTING THE INPUT VALUES OF THE FORM
  // IF ADD VARIANT FORM IS OPENED -THEN THE INPUT FIELDS ARE SET TO EMPTY
  //IF UPDATE VARIANT IS OPENED - INPUT VALUES ARE FILLED WITH THE CURRENT TITLE AND DESCRIPTION OF THE TASK WHOSE EDIT BUTTON IS CLICKED
  useEffect(() => {
    if (variant === "update" && selectedTaskToUpdate) {
      const task = filteredTasks.find((t) => t.id === selectedTaskToUpdate);

      setTaskFormData(task || emptyState);
    } else {
      setTaskFormData(emptyState);
    }
  }, [variant, selectedTaskToUpdate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (variant === "add") {
      const success = await addTask(taskFormData);
      if (success) {
        setTaskFormData(emptyState);
        hideTaskInput();
      }
      return;
    }

    if (variant === "update") {
      const success = await updateTask(taskFormData, selectedTaskToUpdate);
      if (success) {
        setTaskFormData(emptyState);
        setSelectedTaskToUpdate(null);
        hideTaskUpdateInput();
      }
    }
  }

  const isSubmitting = variant === "add" ? isAddingTask : isUpdatingTask;
  const currentError = variant === "add" ? addTaskError : updateTaskError;
  return (
    <DarkOverlay
      //a BOOLEAN PROP THAT CONTROLS THE VISIBILITY OF THE OVERLAY COMPONENT
      overlayVisible={
        variant === "add" ? AddTaskInputOverlay : UpdateTaskInputOverlay
      }
      //A PROP THAT HANDLES THE OPERATIOIN WHEN THE TRANSPARENT OVERLAY IS CLICKED
      handleClose={variant === "add" ? hideTaskInput : hideTaskUpdateInput}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl sm:max-w-2xl rounded-xl px-4 sm:px-8 py-6 sm:py-8 bg-white flex flex-col gap-4 relative z-50 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title:</label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            name="title"
            value={taskFormData?.title}
            onChange={(e) =>
              setTaskFormData({
                ...taskFormData,
                [e.target.name]: e.target.value,
              })
            }
            required
            className="border-2 p-2 rounded-md w-full text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={taskFormData?.description}
            rows={5}
            cols={60}
            className="border-2 p-2 rounded-md w-full resize-y text-sm sm:text-base min-h-32"
            onChange={(e) =>
              setTaskFormData({
                ...taskFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        {!isSubmitting && currentError ? (
          <p className="text-red-500">{currentError}</p>
        ) : null}
        <Button type="primary" className="w-full self-end">
          {isSubmitting
            ? `${variant[0].toUpperCase() + variant.slice(1)}ing...`
            : variant[0].toUpperCase() + variant.slice(1)}
        </Button>
      </form>
    </DarkOverlay>
  );
}
