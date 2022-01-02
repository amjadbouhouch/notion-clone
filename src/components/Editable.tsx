import React, { Component } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
interface Props {
  html: string;
  handleChange: (html: string) => void;
  tagName?: "heading" | "paragraph";
  classNames?: string;
}
interface State {
  html: string;
}
export default class Editable extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { html: this.props.html };
  }
  handleChange = (event: ContentEditableEvent) => {
    this.props?.handleChange(event.target.value);
  };
  render() {
    return (
      <ContentEditable
        className={`w-full h-auto outline-0 ${
          this.props?.tagName === "heading" ? "text-3xl" : "text-cs"
        } ${this.props.classNames}`}
        html={this.props.html}
        placeholder={"Untitled"}
        disabled={false} // use true to disable editing
        onChange={this.handleChange} // handle innerHTML change
      />
    );
  }
}
