import {
  AnnotationIcon,
  ClockIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
/** */
export default function Header() {
  const { id } = useParams<{ id: string }>();
  const { pages } = useAppContext();
  const history = useHistory();
  useEffect(() => {
    let dataBase = pages.find((d) => d._id === id);
    if (!dataBase) {
      history.push("/");
    }
  }, [id]);
  const selectedDataBase = useMemo(() => {
    return pages.find((d) => d._id === id);
  }, [id, pages.length]);
  return (
    <div className={`flex p-3 justify-between`}>
      <div className="flex space-x-2 items-center">
        <EmojiHappyIcon className="w-5 h-5 text-gray-500" />
        <span className="capitalize">{selectedDataBase?.name}</span>
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
