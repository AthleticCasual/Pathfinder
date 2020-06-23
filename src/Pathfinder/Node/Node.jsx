import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      col: props.col,
      isStart: props.isStart,
      isEnd: props.isEnd
    };
  }

  getClass() {
    if (this.state.isStart) {
      return "node node-start";
    } else if (this.state.isEnd) {
      return "node node-end";
    } else {
      return "node";
    }
  }

  getId() {
    return this.state.row + "," + this.state.col;
  }

  render() {
    return <div id={this.getId()} className={this.getClass()}></div>;
  }
}
