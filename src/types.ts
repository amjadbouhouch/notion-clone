export interface Page {
  blocks: Block[];
  _id: string;
  name: string;
  description?: string;
  // icon ....
}
export type BlockType =
  | "executeCommands"
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "todo"
  | "image";
type Properties = {};
export interface Block {
  [X: string]: any;
  type: BlockType;
  _id: string;
  properties?: Properties;
  // block parent
  parent?: string;
}
