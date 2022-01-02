import { HandIcon, PlusIcon } from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import useSelectedPage from "../hooks/useSelectedPage";
import { Block } from "../types";
import { Menu } from "./Block/Menu";
import Editable from "./Editable";
interface BlockProps {
  index: number;
  block: Block;
}
interface IMenuPosition {
  isShowing: boolean;
  position: undefined | { x: number; y: number };
}
export default function BLockItem({ block, index }: BlockProps) {
  const { updateBlockContent, AddBlock, updateType } = useAppContext();
  const selectedPage = useSelectedPage();
  const [showMenu, setShowMenu] = useState<IMenuPosition>({
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
  useEffect(() => {}, []);
  const closeMenu = () =>
    setShowMenu({ isShowing: false, position: undefined });
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
    console.log("here!", e?.key);

    switch (e.key) {
      case "/":
        openSelectMenuHandler();
        break;
      case "Enter":
        break;
    }
  };
  const onSelect = (type) => {
    setShowMenu({
      isShowing: false,
      position: undefined,
    });
    updateType(selectedPage!._id, index, type);
    document.getElementById(block._id)?.focus();
  };
  const classNames = useMemo(() => {
    let classes;
    if (block.type === "h1") {
      classes = "text-3xl";
    } else if (block.type === "h2") {
      classes = "text-2xl";
    } else if (block.type === "h3") {
      classes = "text-base";
    }
    return classes;
  }, [block.type]);
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

      <div className="flex-1">
        <Editable
          classNames={classNames}
          placeholder="Type / for commands"
          html={block?.content || ""}
          handleChange={handleChange}
          onKeyDown={onKeyDown}
          id={block._id}
        />
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
