import React, { Component } from "react";
import Node from "./Node/Node";
import {dijkstra} from "../Algorithms/dijkstra";

import "./Pathfinder.css";

const ROWS = 20;
const COLS = 50;

const START_ROW = 10;
const START_COL = 15;
const END_ROW = 3;
const END_COL = 35;

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    let grid = this.getInitialGrid();
    this.setState({grid});
  }

  createNode(row, col) {
    let node = {
      row,
      col,
      isStart: row === START_ROW && col === START_COL,
      isEnd: row === END_ROW && col === END_COL,
      isVisited: false,
      distance: Infinity,
      prevNode: null
    };
    return node;
  }

  getInitialGrid() {
    let grid = [];
    for (let row = 0; row < ROWS; row++) {
      let currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(this.createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  getId(node) {
    return node.row + "," + node.col;
  }

  async animateVisited(visited) {
    for (let i = 0; i < visited.length; i++) {
      setTimeout(function () {
        let id = visited[i].row + "," + visited[i].col;
        document.getElementById(id).classList.add("visited");
      }, 15 * i);
      // if (i === visited.length - 1) {
      //   let node = visited[visited.length - 1];
      //   while (node.prevNode !== null) {
      //     setTimeout(function(node, i) {
      //       let id = node.row + "," + node.col;
      //       document.getElementById(id).classList.add("path");
      //       node = node.prevNode;
      //       i--;
      //     }, 10 * i);
      //   }
      // }
    }
  }



  async visualizeDijkstra() {
    let {grid} = this.state;
    let start = grid[START_ROW][START_COL];
    let end = grid[END_ROW][END_COL];
    let visited = dijkstra(grid, start, end);
    await this.animateVisited(visited);
    let node = visited[visited.length - 1];
    while (node.prevNode !== null) {
      let id = node.row + "," + node.col;
      document.getElementById(id).classList.add("path");
      node = node.prevNode;
    }
  }

  render() {
    let {grid} = this.state;

    return (
      <main>
        <h1>Pathfinder Visualizer</h1>
        <button onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's</button>
        <div className="grid">
          {grid.map((row, index) => {
            return (
              <div key={index}>
                {row.map((node, index) => {
                  return (
                    <Node
                      key={index}
                      row={node.row}
                      col={node.col}
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
