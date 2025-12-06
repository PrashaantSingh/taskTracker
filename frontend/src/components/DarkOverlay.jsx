//A REUSABEL DARK OVERLAY COMPONENT THAT SHOWS A TRANSPARENT BACKGROUND AND DISPLAY THE PASSED CHILDrEN AS A MODEL

 //--<<overlayVisible>> :a BOOLEAN PROP THAT CONTROLS THE VISIBILITY OF THE OVERLAY COMPONENT
 //--<<handleClose>>: A PROP THAT HANDLES THE OPERATIOIN WHEN THE TRANSPARENT OVERLAY IS CLICKED
export default function DarkOverlay({ children, overlayVisible, handleClose }) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm px-4 py-6 sm:px-6 ${
        overlayVisible ? "" : "hidden"
      }`}
      onClick={() => handleClose()}
    >
      {children}
    </div>
  );
}
