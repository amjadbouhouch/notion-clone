import React from "react";
import { Page } from "../types";
export interface AppContextProps {
  // all page
  pages: Page[];
}
export const AppContext = React.createContext({} as AppContextProps);
