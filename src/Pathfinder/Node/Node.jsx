import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      col: props.col,
      isStart: props.isStart,
      isEnd: props.isEnd,
      isWall: props.isWall,
    };
  }

  getClass() {
    if (this.state.isStart) {
      return "node-start";
    } else if (this.state.isEnd) {
      return "node-end";
    } else if (this.state.isWall) {
      console.log("yay we got a wall");
      return "node-wall";
    } else {
      return "";
    }
  }

  getId() {
    return this.state.row + "," + this.state.col;
  }

  render() {
    let { row, col } = this.state;
    return (
      <div
        id={this.getId()}
        className={"node " + this.getClass()}
        onMouseDown={() => this.props.onMouseDown(row, col)}
        onMouseEnter={() => this.props.onMouseEnter(row, col)}
        onMouseUp={() => this.props.onMouseUp()}
      ></div>
    );
  }
}
