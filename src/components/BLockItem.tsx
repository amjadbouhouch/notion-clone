import { HandIcon, PlusIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import useOnPressOutside from "../hooks/useOnPressOutside";
import { Block } from "../types";
import EditableHeading from "./Block/EditableHeading";
import EditableParagraph from "./Block/EditableParagraph";
interface BlockProps {
  index: number;
  block: Block;
}
interface ICommandsPosition {
  isShowing: boolean;
  position: undefined | { x: number; y: number };
}
export default function BLockItem({ block, index }: BlockProps) {
  const { updateBlockContent, AddBlock } = useAppContext();
  const [showCommands, setShowCommands] = useState<ICommandsPosition>({
    isShowing: false,
    position: undefined,
  });
  /** content html string */
  function handleChange(content: string) {
    // if (showCommands.isShowing) {
    //   setShowCommands({
    //     isShowing: false,
    //     position: undefined,
    //   });
    // }
    // updateBlockContent(pageIndex, index, content);
  }

  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleOnBlur = () => {
    // AddBlock(pageIndex, true);
  };
  // const sanitizeConf = {
  //   allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
  //   allowedAttributes: { a: ["href"] },
  // };
  useEffect(() => {
    // execute("formatBlock", "h1");
  }, []);
  const closeMenu = () =>
    setShowCommands({ isShowing: false, position: undefined });
  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates(block._id);
    setShowCommands({
      isShowing: true,
      position: {
        x,
        y,
      },
    });
  };
  const onKeyDown = (e) => {
    switch (e.key) {
      case "/":
        openSelectMenuHandler();
        break;
      case "Enter":
        break;
    }
  };

  return (
    <div className="flex  items-center space-x-2 group px-10">
      {showCommands.isShowing && (
        <Menu closeMenu={closeMenu} position={showCommands.position} />
      )}
      <div className="w-12">
        <div className="hidden  group-hover:flex items-center space-x-2">
          <PlusIcon
            onClick={handleClick}
            className="w-5 cursor-pointer h-5 text-gray-500"
          />
          <HandIcon
            onClick={handleClick}
            className="w-5 cursor-pointer h-5 text-gray-500"
          />
        </div>
      </div>

      <div className="flex-1">
        {block.type === "paragraph" ? (
          <EditableParagraph
            onKeyDown={onKeyDown}
            block={block}
            handleChange={handleChange}
            handleOnBlur={handleOnBlur}
          />
        ) : (
          <EditableHeading
            onKeyDown={onKeyDown}
            block={block}
            handleChange={handleChange}
            handleOnBlur={handleOnBlur}
          />
        )}
      </div>
    </div>
  );
}
function Menu({ position, closeMenu }) {
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
      className="absolute bg-white text-sm w-72 rounded shadow-md border border-gray-200"
    >
      <div className="text-gray-600 text-xs p-2 border-b border-b-200">
        <span>BASIC BLOCKS</span>
      </div>
      <div className="overflow-y-auto h-64">
        <div className="p-2 space-x-2 hover:bg-gray-100 cursor-pointer flex items-center">
          <div className="w-10 h-10 rounded-sm border shadow border-gray-200"></div>
          <div className="space-y-2">
            <label>Text</label>
            <p className="text-gray-500 text-xs">
              Just start writing with plain text.
            </p>
          </div>
        </div>
        <div className="p-2 space-x-2 hover:bg-gray-100 cursor-pointer flex items-center">
          <div className="w-10 h-10 rounded-sm border shadow border-gray-200"></div>
          <div className="space-y-2">
            <label>Heading 1</label>
            <p className="text-gray-500 text-xs">Big section heading</p>
          </div>
        </div>
        <div className="p-2 space-x-2 hover:bg-gray-100 cursor-pointer flex items-center">
          <div className="w-10 h-10 rounded-sm border shadow border-gray-200"></div>
          <div className="space-y-2">
            <label>Heading 2</label>
            <p className="text-gray-500 text-xs">Medium section heading</p>
          </div>
        </div>
        <div className="p-2 space-x-2 hover:bg-gray-100 cursor-pointer flex items-center">
          <div className="w-10 h-10 rounded-sm border shadow border-gray-200"></div>
          <div className="space-y-2">
            <label>Heading 3</label>
            <p className="text-gray-500 text-xs">Small section heading</p>
          </div>
        </div>
        <div className="p-2 space-x-2 hover:bg-gray-100 cursor-pointer flex items-center">
          <div className="w-10 h-10 rounded-sm border shadow border-gray-200"></div>
          <div className="space-y-2">
            <label>Image</label>
            <p className="text-gray-500 text-xs">
              Upload or embed with a link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
const getCaretCoordinates = (elemId: string) => {
  let x, y;
  const selection = window.getSelection();

  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    // range.collapse(false);
    const rect = range.getClientRects()[0];

    if (rect) {
      x = rect.left;
      y = rect.top;
    } else {
      x = document.getElementById(elemId)!.getBoundingClientRect().x;
      y = document.getElementById(elemId)!.getBoundingClientRect().top;
    }
  }
  return { x, y };
};
// TODO
// function execute(cmd: string, arg?: string) {
//   document.execCommand(cmd, false, arg);
// }
