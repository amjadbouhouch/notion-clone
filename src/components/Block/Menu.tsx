import { useEffect, useRef, useState } from "react";
import useOnPressOutside from "../../hooks/useOnPressOutside";
const MENU = [
  {
    title: "Text",
    description: "Just start writing with plain text.",
    command: "paragraph",
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    command: "h1",
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    command: "h2",
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    command: "h3",
  },
  {
    title: "Image",
    description: "Upload or embed with a link.",
    command: "image",
  },
];
export function Menu({ position, closeMenu, onSelect }) {
  const menuRef = useRef(null);
  const { isClickedOutside } = useOnPressOutside(menuRef);
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    if (isClickedOutside) {
      closeMenu();
    }
  }, [isClickedOutside, closeMenu]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          onSelect(MENU[selectedItem].command);

          event.preventDefault();
          break;
        case "ArrowDown":
          setSelectedItem((prev) => {
            if (prev === MENU.length - 1) {
              return prev;
            }
            return prev + 1;
          });
          break;
        case "ArrowUp":
          setSelectedItem((prev) => {
            if (prev === 0) {
              return prev;
            }
            return prev - 1;
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, onSelect]);
  const style = {
    top: position?.y + 19,
    left: position?.x + 5,
  };
  return (
    <div
      ref={menuRef}
      style={style}
      className="absolute text-sm bg-white border border-gray-200 rounded shadow-md w-72"
    >
      <div className="p-2 text-xs text-gray-600 border-b border-b-200">
        <span>BASIC BLOCKS</span>
      </div>
      <ul className="h-64 overflow-y-auto">
        {MENU.map(({ description, title, command }, index) => (
          <li
            key={index}
            onClick={() => onSelect(command)}
            className={`flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-50 ${
              selectedItem === index && "bg-gray-100"
            }`}
          >
            <div className="w-10 h-10 border border-gray-200 rounded-sm shadow"></div>
            <div className="space-y-2">
              <label>{title}</label>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
