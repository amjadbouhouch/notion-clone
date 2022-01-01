export interface Page {
  blocks: Block[];
  _id: string;
  name: string;
  // icon ....
}

export interface Block {
  [X: string]: any;
  _id: string;
}
