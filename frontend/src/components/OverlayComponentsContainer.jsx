import React from "react";
import TaskInputForm from "./TaskInputForm";
import TaskDetails from "./TaskDetails";
//A WRAPPER COMPONENT THAT CONTAINS ALL THE COMPONENT THAT IS DISPLAYED AS A MODEL WITH DARK OVERLAY
export default function OverlayComponentsContainer() {
  return (
    <>
      {/* FORM THAT APPEARS WHEN THE USER CLICKS ADD TASK*/}
      <TaskInputForm variant="add" />

      {/* FORM THAT APPEARS WHEN THE USER CLICKS EDIT BUTTON/ICON*/}
      <TaskInputForm variant="update" />

      {/* THIS COMPONENT SHOWS THE TASK DETAILS WHEN CLICKED ON THE INDIVIDUAL CARDS/TASKS */}
      <TaskDetails />
    </>
  );
}
