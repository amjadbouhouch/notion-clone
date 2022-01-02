import {
  AnnotationIcon,
  ClockIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  MenuIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import usePageContext from "../hooks/usePageContext";
import Editable from "../components/Editable";
interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}
/** */
export default function Header({ isSidebarOpen, toggleSideBar }: HeaderProps) {
  const { page: selectedPage, updateTitle } = usePageContext();
  const history = useHistory();
  const handleChange = (html: string) => {
    updateTitle(html);
  };
  return (
    <div className={`flex text-sm p-3 justify-between shadow-sm`}>
      <div className="flex items-center space-x-2">
        {!isSidebarOpen && (
          <MenuIcon
            onClick={toggleSideBar}
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-600"
          />
        )}
        <EmojiHappyIcon className="w-5 h-5 text-gray-500" />
        <Editable
          tagName="paragraph"
          html={selectedPage?.name || ""}
          placeholder="Untitled"
          handleChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-3">
        <span>Share</span>
        <AnnotationIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <ClockIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <StarIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <DotsHorizontalIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}
