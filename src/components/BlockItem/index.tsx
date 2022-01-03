import { HandIcon, PlusIcon } from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { getCaretCoordinates } from "../../utils";
import usePageContext from "../../hooks/usePageContext";
import { Block } from "../../types";
import { Menu } from "./Menu";
import Editable from "./../Editable";
interface BlockProps {
  index: number;
  block: Block;
  isLast: boolean;
}
interface IMenuPosition {
  isShowing: boolean;
  position: undefined | { x: number; y: number };
}
const DEFAULT_MENU_STATE = {
  isShowing: false,
  position: undefined,
};
export default function BLockItem({ block, index, isLast }: BlockProps) {
  const {
    updateBlockContent,
    updateType,
    handleEnterPressed,
    handleBackspacePressed,
    page,
  } = usePageContext();
  const [showMenu, setShowMenu] = useState<IMenuPosition>(DEFAULT_MENU_STATE);
  /** content html string */
  function handleChange(content: string) {
    if (showMenu.isShowing) {
      if (content.trim().length === 0) {
        setShowMenu(DEFAULT_MENU_STATE);
      }
    }
    updateBlockContent(index, content);
  }

  const handleClick = (e) => {
    e.stopPropagation();
  };
  /** */
  const handleOnBlur = () => {
    // AddBlock(pageIndex, true);
  };
  // const sanitizeConf = {
  //   allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
  //   allowedAttributes: { a: ["href"] },
  // };
  useEffect(() => {}, []);
  /** */
  const closeMenu = () =>
    setShowMenu({ isShowing: false, position: undefined });
  /** */
  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates(block._id);
    setShowMenu({
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
        if (block.type === "executeCommands") openSelectMenuHandler();
        break;
      case "Enter":
        if (showMenu.isShowing) {
          return;
        }
        handleEnterPressed(index);
        break;
      case "Backspace":
        handleBackspacePressed(index);
        break;
    }
  };
  const onSelect = (type) => {
    setShowMenu({
      isShowing: false,
      position: undefined,
    });
    updateType(index, type);
    document.getElementById(block._id)?.focus();
  };
  const [classNames, placeholder] = useMemo(() => {
    let classes = "test-sm";
    let placeholder = "Type / for commands";
    if (block.type === "h1") {
      classes = "text-3xl";
      placeholder = "Heading 1";
    } else if (block.type === "h2") {
      classes = "text-2xl";
      placeholder = "Heading 2";
    } else if (block.type === "h3") {
      classes = "text-base";
      placeholder = "Heading 3";
    } else if (block.type === "paragraph") {
      placeholder = "start typing...";
    }
    return [classes, placeholder];
  }, [block.type]);
  // const NotShowPlaceholder = !isLast && page.blocks.length > 1;
  return (
    <div className="flex items-center px-10 space-x-2 group">
      {showMenu.isShowing && (
        <Menu
          onSelect={onSelect}
          closeMenu={closeMenu}
          position={showMenu.position}
        />
      )}
      <div className="w-12">
        <div className="items-center hidden space-x-2 group-hover:flex">
          <PlusIcon
            onClick={handleClick}
            className="w-5 h-5 text-gray-500 cursor-pointer"
          />
          <HandIcon
            onClick={handleClick}
            className="w-5 h-5 text-gray-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 hover:bg-gray-100">
        <Editable
          classNames={classNames}
          placeholder={placeholder}
          html={block?.content || ""}
          handleChange={handleChange}
          onKeyDown={onKeyDown}
          id={block._id}
        />
      </div>
    </div>
  );
}

// TODO
// function execute(cmd: string, arg?: string) {
//   document.execCommand(cmd, false, arg);
// }
