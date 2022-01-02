import { useState } from "react";
import { Page } from "../types";
import { generateBlock, generatePage } from "../utils/index";
/** generate fake data */
const FAKE_DATA = Array.from({ length: 10 }).map(generatePage);
/** helper */
const focusOnLastBlock = (id) => {
  document.getElementById(id)?.focus();
};
/** data */
export default function usePages() {
  const [pages, setPages] = useState<Page[]>(FAKE_DATA);
  /**
   *
   * @param pageIndex: number
   * @param force: forcing to add new block
   */
  function AddBlock(pageIndex: number, force = false) {
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
        const shouldFocusOnLastElement = Boolean(
          lastBLock && lastBLock?.content?.trim()?.length === 0
        );
        if (shouldFocusOnLastElement) {
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
  const updateTitle = (pageId, newTitle) => {
    setPages((prev) => {
      let draft = [...prev];
      const pageIndex = draft.findIndex((p) => p._id === pageId);
      if (~pageIndex) {
        if (draft[pageIndex]) draft[pageIndex].name = newTitle;
      }
      return draft;
    });
  };

  return {
    pages,
    setPages,
    AddBlock,
    updateBlockContent,
    updateTitle,
  };
}
