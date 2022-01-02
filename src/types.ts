export interface Page {
  blocks: Block[];
  _id: string;
  name: string;
  description?: string;
  // icon ....
}
type Type = "paragraph" | "h1" | "h2" | "h3" | "todo" | "image";
type Properties = {};
export interface Block {
  [X: string]: any;
  type: Type;
  _id: string;
  properties?: Properties;
  // block parent
  parent?: string;
}
