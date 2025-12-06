//A REUSABLE BUTTON COMPONENT
// ---<<WE CAN CUSTOMIZE THE BUTTON BY PASSING CUSTOM CLASSNAMES>>--
export default function Button({
  type,
  children,
  handleClick,
  className = "",
}) {
  const types = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      onClick={handleClick}
      className={`${types[type]} px-3 py-2 text-sm rounded-md cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
