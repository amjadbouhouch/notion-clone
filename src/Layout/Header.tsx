import {
  AnnotationIcon,
  ClockIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  MenuIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}
/** */
export default function Header({ isSidebarOpen, toggleSideBar }: HeaderProps) {
  const { id } = useParams<{ id: string }>();
  const { pages } = useAppContext();
  const history = useHistory();
  useEffect(() => {
    let dataBase = pages.find((d) => d._id === id);
    if (!dataBase) {
      history.push("/");
    }
  }, [id]);
  const selectedPage = useMemo(() => {
    return pages.find((d) => d._id === id);
  }, [id]);
  return (
    <div className={`flex text-sm p-3 justify-between shadow-sm`}>
      <div className="flex space-x-2 items-center">
        {!isSidebarOpen && (
          <MenuIcon
            onClick={toggleSideBar}
            className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer"
          />
        )}
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
