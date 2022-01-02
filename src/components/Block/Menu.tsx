import { useEffect, useRef } from "react";
import useOnPressOutside from "../../hooks/useOnPressOutside";
export function Menu({ position, closeMenu, onSelect }) {
  const menuRef = useRef(null);
  const { isClickedOutside } = useOnPressOutside(menuRef);
  useEffect(() => {
    if (isClickedOutside) {
      closeMenu();
    }
  }, [isClickedOutside]);
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
      <div className="h-64 overflow-y-auto">
        <div
          onClick={() => onSelect("paragraph")}
          className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-10 h-10 border border-gray-200 rounded-sm shadow"></div>
          <div className="space-y-2">
            <label>Text</label>
            <p className="text-xs text-gray-500">
              Just start writing with plain text.
            </p>
          </div>
        </div>
        <div
          onClick={() => onSelect("h1")}
          className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-10 h-10 border border-gray-200 rounded-sm shadow"></div>
          <div className="space-y-2">
            <label>Heading 1</label>
            <p className="text-xs text-gray-500">Big section heading</p>
          </div>
        </div>
        <div
          onClick={() => onSelect("h2")}
          className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-10 h-10 border border-gray-200 rounded-sm shadow"></div>
          <div className="space-y-2">
            <label>Heading 2</label>
            <p className="text-xs text-gray-500">Medium section heading</p>
          </div>
        </div>
        <div
          onClick={() => onSelect("h3")}
          className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-10 h-10 border border-gray-200 rounded-sm shadow"></div>
          <div className="space-y-2">
            <label>Heading 3</label>
            <p className="text-xs text-gray-500">Small section heading</p>
          </div>
        </div>
        <div
          onClick={() => onSelect("image")}
          className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-10 h-10 border border-gray-200 rounded-sm shadow"></div>
          <div className="space-y-2">
            <label>Image</label>
            <p className="text-xs text-gray-500">
              Upload or embed with a link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
