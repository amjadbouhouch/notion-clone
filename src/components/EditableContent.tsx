import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { Block } from "../types";
import "./style.css";
interface Props {
  block: Block;
  handleChange: (html: string) => void;
  tagName?: "div" | "h2" | "pre" | "p";
  onKeyDown: (ev: any) => void;
  handleOnBlur: () => void;
}
/** should be a class component !! ;) */
export default class EditableContent extends Component<Props, {}> {
  contentEditable;
  constructor(args) {
    super(args);
    this.contentEditable = React.createRef();
  }
  handleChange = (evt) => {
    this.props.handleChange(evt.target.value);
  };
  onContentEditableClicked = (ev) => {
    ev.stopPropagation();
  };
  render() {
    return (
      <div className="hover:bg-gray-100 flex-1">
        <ContentEditable
          id={this.props.block._id}
          onClick={this.onContentEditableClicked}
          className="w-full border-b h-auto text-3xl outline-0 border-gray-100 rounded-sm"
          innerRef={this.contentEditable}
          placeholder={"Untitled"}
          onBlur={this.props.handleOnBlur}
          onKeyDown={this.props.onKeyDown}
          html={this.props.block.content} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
          tagName={this.props?.tagName || "div"}
        />
      </div>
    );
  }
}
