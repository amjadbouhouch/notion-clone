import { HomeIcon } from "@heroicons/react/outline";
import { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useParams } from "react-router";
import BLockItem from "../components/BLockItem";
import { useAppContext } from "../hooks/useAppContext";
import useSelectedPage from "../hooks/useSelectedPage";
import "./style.css";

export default function PageContent() {
  // get id from url
  const { id } = useParams<{ id: string }>();
  const { pages, AddBlock } = useAppContext();
  const selectedPage = useSelectedPage();
  return (
    <div
      className={`flex-grow overflow-y-auto flex  cursor-text flex-col space-y-2`}
    >
      <HeaderSection />
      <div className="flex-1 pt-10">
        {selectedPage?.blocks?.map((block, index) => (
          <BLockItem block={block} index={index} key={block._id} />
        ))}
      </div>
    </div>
  );
}
const HeaderSection = () => {
  const selectedPage = useSelectedPage();
  const { updateTitle } = useAppContext();
  const text = useRef(selectedPage?.name || "");
  const handleChange = (e) => {
    const newTitle = e.target.value;
    text.current = newTitle;
    updateTitle(selectedPage!._id, newTitle);
  };
  useEffect(() => {
    if (!selectedPage?.name) return;
    text.current = selectedPage!.name;
  }, [selectedPage]);
  return (
    <div>
      {/* cover */}
      <div className="h-40 group relative bg-slate-800 w-full">
        {/* icon */}
        <div className="absolute -bottom-5 bg-white p-1 rounded-md left-20">
          <HomeIcon className="w-16 h-16 text-gray-600" />
        </div>
        <div className="absolute cursor-pointer hidden group-hover:flex bottom-5 bg-white px-2 py-1 rounded-md right-10">
          <div className="text-xs text-gray-500">Change cover</div>
        </div>
      </div>
      {/* title */}
      <div className="mt-10 px-20 flex flex-col">
        <ContentEditable
          className="w-full h-auto text-3xl outline-0"
          html={text.current}
          placeholder={"Untitled"}
          // onBlur={props.handleOnBlur}
          // onKeyDown={this.props.onKeyDown}
          disabled={false} // use true to disable editing
          onChange={handleChange} // handle innerHTML change
        />
        <label className="text-sm text-gray-500">
          page data
        </label>
      </div>
    </div>
  );
};
