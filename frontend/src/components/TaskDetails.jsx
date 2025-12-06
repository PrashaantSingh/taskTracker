import useGlobalStore from "../store/globalStore";
import Button from "./Button";
import DarkOverlay from "./DarkOverlay";

//<<<--THIS COMPONENT IS RESPONSIBLE FOR DISPLAYING THE TASK DETAILS WHEN A TASK IS CLICKED-->>>

export default function TaskDetails() {
  const {
    selectedTaskId,
    tasks,
    deleteTask,
    hideTaskDetails,
    markTaskCompleted,
  } = useGlobalStore();
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <DarkOverlay
      overlayVisible={Boolean(selectedTaskId)}
      handleClose={hideTaskDetails}
    >
      <div
        //STOPPING THE EVENT PROPAGATION SO THAT CLICKING INSIDE THIS COMPONENT DOES NOT CLOSE THE OVERLAY (BACAUSE I HAVE ATTACHED ONCLICK HANDLER ON THE DARKOVERLAY COMPONENT FOR CLOSING THE OVERLAY)
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg p-5 sm:p-8 w-full max-w-lg mx-auto animate-fadeIn text-left"
      >
        <div className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900 wrap-break-word">
            {selectedTask?.title}
          </h2>
          <p className="text-gray-600 leading-relaxed wrap-break-word">
            {selectedTask?.description}
          </p>
        </div>

        <div className="w-full h-px bg-black/15 mt-10 mb-4"></div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="danger"
            handleClick={() => {
              hideTaskDetails();
              deleteTask(selectedTaskId);
            }}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="w-full sm:w-44 text-center"
            handleClick={() => {
              markTaskCompleted(selectedTaskId);
            }}
          >
            {selectedTask?.status === "pending"
              ? "Mark As Completed"
              : "Completed"}
          </Button>
        </div>
      </div>
    </DarkOverlay>
  );
}
