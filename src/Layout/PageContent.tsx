import { HomeIcon } from "@heroicons/react/outline";
import BLockItem from "../components/BlockItem";
import Editable from "../components/Editable";
import usePageContext from "../hooks/usePageContext";
import "./style.css";

export default function PageContent() {
  const { page } = usePageContext();
  return (
    <div
      className={`flex-grow overflow-y-auto flex  cursor-text flex-col space-y-2`}
    >
      <HeaderSection />
      <div className="flex-1 pt-10">
        {page?.blocks?.map((block, index) => (
          <BLockItem
            isLast={index === page?.blocks.length - 1}
            block={block}
            index={index}
            key={block._id}
          />
        ))}
      </div>
    </div>
  );
}
const HeaderSection = () => {
  const { updateTitle, updateDescription, page } = usePageContext();

  const handleChange = (html: string) => {
    updateTitle(html);
  };
  const handleChangeDescription = (html: string) => {
    updateDescription(html);
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

      <div className="flex flex-col px-20 mt-10">
        {/* title */}
        <Editable
          tagName="heading"
          html={page?.name || ""}
          placeholder="Untitled"
          handleChange={handleChange}
        />
        {/* Description */}
        <Editable
          tagName="paragraph"
          classNames="text-gray-700"
          placeholder="Add description"
          html={page?.description || ""}
          handleChange={handleChangeDescription}
        />
      </div>
    </div>
  );
};
