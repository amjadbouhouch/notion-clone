import { insertNewItemAtIndex } from "./../utils/index";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";
import { Page, BlockType, Block } from "../types";
import { generateBlock } from "../utils";
import { useAppContext } from "./useAppContext";
const focusOnBlock = (id) => {
  document.getElementById(id)?.focus();
};

export default function useSelectedPage(deps?: any) {
  const { id } = useParams<{ id: string }>();
  const { pages } = useAppContext();
  const [page, setPage] = useState<Page | undefined>(undefined);
  useEffect(() => {
    const currentPage = pages.find((p) => p._id === id);
    if (currentPage) setPage({ ...currentPage });
  }, [id]);

  // functions
  function updateBlockContent(blockIndex: number, html: string) {
    if (page?.blocks[blockIndex]?.type === "executeCommands") {
      setPage((prev) => {
        let draft = { ...prev } as Page;
        if (draft.blocks[blockIndex]) {
          draft.blocks[blockIndex].content = html;
          draft.blocks[blockIndex].type = "paragraph";
        }
        return draft;
      });
    } else
      setPage((prev) => {
        let draft = { ...prev } as Page;
        if (draft.blocks[blockIndex]) {
          draft.blocks[blockIndex].content = html;
        }
        return draft;
      });
  }
  function updateTitle(newTitle: string) {
    //@ts-ignore
    setPage((prev) => ({ ...prev, name: newTitle }));
  }
  function updateDescription(newDescription: string) {
    //@ts-ignore
    setPage((prev) => ({ ...prev, description: newDescription }));
  }
  function AddBlock(force?: boolean) {
    const block = generateBlock();
    block.type = "paragraph";
    flushSync(() => {
      //@ts-ignore
      setPage((prev) => ({
        ...prev,
        //@ts-ignore
        blocks: [...prev?.blocks, block],
      }));
    });
    focusOnBlock(block._id);
  }
  /** */
  function updateType(blockIndex: number, newType: BlockType) {
    setPage((prev) => {
      let draft = { ...prev } as Page;
      if (draft!.blocks![blockIndex].type === "executeCommands") {
        // TODO should remove the content of "/"
      }
      draft!.blocks![blockIndex].type = newType;
      draft!.blocks![blockIndex].content =
        draft!.blocks![blockIndex]?.content?.replace("/", "") || "";
      return draft;
    });
  }
  /** */
  function handleEnterPressed(blockIndex: number) {
    // easy
    if (!page?.blocks[blockIndex + 1]) {
      // should add new one
      AddBlock(true);
    } else {
      const newBLock = generateBlock();
      // insert new one
      flushSync(() => {
        setPage((prev) => {
          let draft = { ...prev } as Page;
          draft.blocks = insertNewItemAtIndex(
            draft.blocks,
            blockIndex + 1,
            newBLock
          );
          return draft;
        });
      });
      focusOnBlock(newBLock._id);
    }
  }
  function removeBLockAtIndex(blockIndex: number) {
    if (blockIndex === 0 && page?.blocks.length === 1) {
      return;
    }
    if (page?.blocks[blockIndex - 1]) {
      // try to focus on the prev block
      focusOnBlock(page?.blocks[blockIndex - 1]._id);
    }
    setPage((prev) => {
      let draft = { ...prev } as Page;
      draft.blocks.splice(blockIndex, 1);
      return draft;
    });
  }
  /** */
  function handleBackspacePressed(blockIndex: number) {
    const selectedBlock = page!.blocks[blockIndex] as Block;
    if (selectedBlock?.content.length > 0) {
      return;
    }
    if (selectedBlock.type !== "executeCommands") {
      updateType(blockIndex, "executeCommands");
    } else {
      removeBLockAtIndex(blockIndex);
    }
  }
  return {
    page: page as Page,
    updateBlockContent,
    updateTitle,
    updateDescription,
    updateType,
    AddBlock,
    handleEnterPressed,
    handleBackspacePressed,
  };
}
