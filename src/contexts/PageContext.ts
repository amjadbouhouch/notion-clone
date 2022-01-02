import React from "react";
import { Page, BlockType } from "../types";
export interface PageContextProps {
  page: Page;
  // functions
  AddBlock: (force?: boolean) => void;
  /**
   *
   */
  updateBlockContent: (blockIndex: number, html: string) => void;
  /** update title of the page */
  updateTitle: (newTitle: string) => void;
  updateDescription: (newDescription: string) => void;
  updateType: (blockIndex: number, newType: BlockType) => void;
  handleEnterPressed: (blockIndex: number) => void;
  handleBackspacePressed: (blockIndex: number) => void;
}
export const PageContext = React.createContext({} as PageContextProps);
