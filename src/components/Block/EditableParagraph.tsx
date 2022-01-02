import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { Block } from "../../types";

interface Props {
  block: Block;
  handleChange: (html: string) => void;
  onKeyDown: (ev: any) => void;
  handleOnBlur: () => void;
}
/** should be a class component !! ;) */
export default class EditableParagraph extends Component<Props, {}> {
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
          className="w-full border-b h-auto text-sm outline-0 border-gray-100 rounded-sm"
          innerRef={this.contentEditable}
          placeholder={"Type '/' for commands"}
          onBlur={this.props.handleOnBlur}
          onKeyDown={this.props.onKeyDown}
          html={this.props.block.content} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
        />
      </div>
    );
  }
}
