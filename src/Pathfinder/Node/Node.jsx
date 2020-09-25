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
    // let className = () => {
    //   if (this.state.isStart) {
    //     return "node-start";
    //   } else if (this.state.isEnd) {
    //     return "node-end";
    //   } else if (this.state.isWall) {
    //     return "node-wall";
    //   } else {
    //     return "";
    //   }
    // };

    let className = this.state.isEnd
      ? "node-end"
      : this.state.isStart
      ? "node-start"
      : this.state.isWall
      ? "node-wall"
      : "";

    return (
      <div
        id={this.getId()}
        className={`node ${className}`}
        onMouseDown={() => this.props.onMouseDown(row, col)}
        onMouseEnter={() => this.props.onMouseEnter(row, col)}
        onMouseUp={() => this.props.onMouseUp()}
      ></div>
    );
  }
}
