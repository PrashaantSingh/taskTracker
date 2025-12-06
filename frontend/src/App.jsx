import { useEffect } from "react";
import "./App.css";
import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import useGlobaStore from "./store/globalStore";
import OverlayComponentsContainer from "./components/OverlayComponentsContainer";

export default function App() {
  const {
    AddTaskInputOverlay,
    UpdateTaskInputOverlay,
    selectedTaskId,
    fetchTasks,
  } = useGlobaStore();
  const anyOverlayIsOpened =
    AddTaskInputOverlay || UpdateTaskInputOverlay || selectedTaskId !== null;

    useEffect(()=>{
      fetchTasks()
    },[])
    
  useEffect(() => {
    if (anyOverlayIsOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [anyOverlayIsOpened]);
  return (
    <>
      <main className="max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <TaskHeader />
        <TaskList />
      </main>
      <OverlayComponentsContainer />
    </>
  );
}
