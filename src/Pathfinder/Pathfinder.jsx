import React, { Component } from "react";
import Node from "./Node/Node";

import "./Pathfinder.css";

const ROWS = 20;
const COLS = 50;

const START_ROW = 10;
const START_COL = 15;
const END_ROW = 10;
const END_COL = 35;

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: this.setGrid(),
    };
  }

  setGrid() {
    let nodes = [];
    for (let row = 0; row < ROWS; row++) {
      let row = [];
      for (let col = 0; col < COLS; col++) {
        let currentNode = {
          row,
          col,
          isStart: row === START_ROW && col === START_COL,
          isFinish: row === END_ROW && col === END_COL,
        };
        row.push(currentNode);
      }
      nodes.push(row);
    }
    return nodes;
  }

  render() {
    const { nodes } = this.state;
    console.log({ nodes });

    return (
      <main>
        <h1>Pathfinder Visualizer</h1>
        <div className="grid">
          {nodes.map((row, index) => {
            return (
              <div key={index}>
                {row.map((node, index) => {
                  let { isStart, isEnd } = node;
                  return (
                    <Node
                      key={index}
                      isStart={node.isStart}
                      isEnd={node.isEnd}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}
