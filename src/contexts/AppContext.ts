import React from "react";
import { Page } from "../types";
export interface AppContextProps {
  // all page
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  // functions
  AddBlock: (pageIndex: number, force?: boolean) => void;
  /**
   *
   */
  updateBlockContent: (
    pageIndex: number,
    blockIndex: number,
    html: string
  ) => void;
  /** update title of the page */
  updateTitle: (pageId: string, newTitle: string) => void;
}
export const AppContext = React.createContext({} as AppContextProps);
