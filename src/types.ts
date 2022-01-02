export interface Page {
  blocks: Block[];
  _id: string;
  name: string;
  // icon ....
}
type Type = "paragraph" | "heading" | "todo" | "image";
type Properties = {};
export interface Block {
  [X: string]: any;
  type: Type;
  _id: string;
  properties?: Properties;
  // block parent
  parent?: string;
}
