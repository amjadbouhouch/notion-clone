import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import BLockItem from "../components/BLockItem";
import { useAppContext } from "../hooks/useAppContext";
import "./style.css";
export default function PageContent() {
  // get id from url
  const { id } = useParams<{ id: string }>();
  const { pages, AddBlock } = useAppContext();
  /** find the current page from the dummy data  */
  const [selectedPage, pageIndex] = useMemo(() => {
    const index = pages.findIndex((d) => d._id === id);
    return [pages[index], index];
  }, [id]);
  /** add new block */
  const AddNewBlock = useCallback(() => AddBlock(pageIndex), [pageIndex]);
  return (
    <div
      className={`flex-grow overflow-y-auto  cursor-text flex-col space-y-2 py-2`}
      onClick={AddNewBlock}
    >
      {selectedPage?.blocks?.map((block, index) => (
        <BLockItem
          block={block}
          pageIndex={pageIndex}
          index={index}
          key={block._id}
        />
      ))}
    </div>
  );
}
