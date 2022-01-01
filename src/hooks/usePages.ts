import { useState } from "react";
import { Page } from "../types";
import { generateBlock, generatePage } from "../utils/index";

const FAKE_DATA = Array.from({ length: 10 }).map(generatePage);
const focusOnLastBlock = (id) => {
  document.getElementById(id)?.focus();
};
export default function usePages() {
  const [pages, setPages] = useState<Page[]>(FAKE_DATA);
  // add new block to specific page
  function AddBlock(pageIndex: number, force?: boolean) {
    setPages((prev) => {
      let draft = [...prev];
      if (!draft[pageIndex]) {
        return draft;
      }
      if (force) {
        draft[pageIndex].blocks.push(generateBlock());
      } else {
        const blocksLen = draft[pageIndex].blocks.length;
        const lastBLock = draft[pageIndex].blocks[blocksLen - 1];
        if (lastBLock && lastBLock?.content?.trim()?.length === 0) {
          focusOnLastBlock(lastBLock._id);
        } else {
          draft[pageIndex].blocks.push(generateBlock());
        }
      }
      return draft;
    });
  }
  function updateBlockContent(
    pageIndex: number,
    blockIndex: number,
    html: string
  ) {
    setPages((prev) => {
      let draft = [...prev];
      draft[pageIndex].blocks[blockIndex].content = html;
      return draft;
    });
  }
  return {
    pages,
    setPages,
    AddBlock,
    updateBlockContent,
  };
}
