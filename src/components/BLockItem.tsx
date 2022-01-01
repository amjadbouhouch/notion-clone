import { HandIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import usePages from "../hooks/usePages";
import { Block } from "../types";
import EditableContent from "./EditableContent";
interface BlockProps {
  index: number;
  block: Block;
  pageIndex: number;
}
export default function BLockItem({ block, index, pageIndex }: BlockProps) {
  const { updateBlockContent, AddBlock } = usePages();
  function handleChange(content: string) {
    // console.log(html);
    updateBlockContent(pageIndex, index, content);
  }
  // const handleChange = (html : string) => {
  //   e.stopPropagation();
  //   console.log(e.target);
  // };
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleOnBlur = () => {
    AddBlock(pageIndex, true);
  };
  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] },
  };
  useEffect(() => {
    // execute("formatBlock", "h1");
  }, []);
  const onKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        console.log("Enter");

        break;
    }
  };

  return (
    <div className="flex items-center relative space-x-2 group px-10">
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
      <EditableContent
        onKeyDown={onKeyDown}
        block={block}
        handleChange={handleChange}
        tagName="h2"
        handleOnBlur={handleOnBlur}
      />
    </div>
  );
}
// TODO
// function execute(cmd: string, arg?: string) {
//   document.execCommand(cmd, false, arg);
// }
