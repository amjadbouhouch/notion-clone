import { customAlphabet } from "nanoid";
import { company } from "faker";
import { Block, Page } from "../types";
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
  12
);
/** generate random id with 12 characters using nanoid */
export const generateId = () => nanoid();

/** generate fake data */
export function generatePage(): Page {
  const randomId = generateId();
  return {
    _id: randomId,
    blocks: Array.from({ length: 1 }).map(generateBlock),
    name: company.bsNoun(),
    description: ``,
  };
}

export function generateBlock(): Block {
  return {
    _id: generateId(),
    content: "",
    type: "executeCommands",
  };
}

export const insertNewItemAtIndex = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
/** */
export const getCaretCoordinates = (elemId: string) => {
  let x, y;
  const selection = window.getSelection();

  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    // range.collapse(false);
    const rect = range.getClientRects()[0];

    if (rect) {
      x = rect.left;
      y = rect.top;
    } else {
      x = document.getElementById(elemId)!.getBoundingClientRect().x;
      y = document.getElementById(elemId)!.getBoundingClientRect().top;
    }
  }
  return { x, y };
};
