import React from "react";
import { Page } from "../types";
export interface AppContextProps {
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  AddBlock: (pageIndex: number, force?: boolean) => void;
}
export const AppContext = React.createContext({} as AppContextProps);
