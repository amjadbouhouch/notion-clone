import { HomeIcon } from "@heroicons/react/outline";
import { useParams } from "react-router";
import BLockItem from "../components/BLockItem";
import Editable from "../components/Editable";
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
  const { updateTitle, updateDescription } = useAppContext();

  const handleChange = (html: string) => {
    updateTitle(selectedPage!._id, html);
  };
  const handleChangeDescription = (html: string) => {
    updateDescription(selectedPage!._id, html);
  };

  return (
    <div>
      {/* cover */}
      <div className="relative w-full h-40 group bg-slate-800">
        {/* icon */}
        <div className="absolute p-1 bg-white rounded-md -bottom-5 left-20">
          <HomeIcon className="w-16 h-16 text-gray-600" />
        </div>
        <div className="absolute hidden px-2 py-1 bg-white rounded-md cursor-pointer group-hover:flex bottom-5 right-10">
          <div className="text-xs text-gray-500">Change cover</div>
        </div>
      </div>
      {/* title */}
      <div className="flex flex-col px-20 mt-10">
        <Editable
          tagName="heading"
          html={selectedPage?.name || ""}
          handleChange={handleChange}
        />
        <Editable
          tagName="paragraph"
          classNames="text-gray-500"
          html={selectedPage?.description || ""}
          handleChange={handleChangeDescription}
        />
      </div>
    </div>
  );
};
