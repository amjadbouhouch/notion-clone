import {
  AnnotationIcon,
  ClockIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  MenuIcon,
  StarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSelectedPage from "../hooks/useSelectedPage";
interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}
/** */
export default function Header({ isSidebarOpen, toggleSideBar }: HeaderProps) {
  const selectedPage = useSelectedPage();
  const history = useHistory();
  useEffect(() => {
    if (!selectedPage?._id) {
      history.push("/");
    }
  }, [selectedPage?._id]);
  return (
    <div className={`flex text-sm p-3 justify-between shadow-sm`}>
      <div className="flex space-x-2 items-center">
        {!isSidebarOpen && (
          <MenuIcon
            onClick={toggleSideBar}
            className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer"
          />
        )}
        <ChevronLeftIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <ChevronRightIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <PlusIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <EmojiHappyIcon className="w-5 h-5 text-gray-500" />
        <span className="capitalize">{selectedPage?.name}</span>
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
