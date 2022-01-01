import { useState } from "react";
import { Page } from "../types";
import { generatePage } from "../utils/index";

const FAKE_DATA = Array.from({ length: 10 }).map(generatePage);
export default function usePages() {
  const [pages, setPages] = useState<Page[]>(FAKE_DATA);
  return {
    pages,
    setPages,
  };
}
