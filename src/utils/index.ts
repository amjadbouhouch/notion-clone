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
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
    cumque laboriosam dolorem accusamus odio doloremque perspiciatis
    deserunt, consequatur labore. Modi sequi consequatur cupiditate magni
    eos tempore facere laboriosam autem dolore.`,
  };
}

export function generateBlock(): Block {
  return {
    _id: generateId(),
    content: "",
    type: "paragraph",
  };
}
