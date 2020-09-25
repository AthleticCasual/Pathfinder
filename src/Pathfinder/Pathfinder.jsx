import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra } from "../Algorithms/dijkstra";

import "./Pathfinder.css";

const ROWS = 20;
const COLS = 50;

const START_ROW = 10;
const START_COL = 10;
const END_ROW = 10;
const END_COL = 39;

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mousePressed: false,
      reset: false,
    };
  }

  componentDidMount() {
    let grid = this.getInitialGrid();
    this.setState({ grid });
  }

  createNode(row, col) {
    let node = {
      row,
      col,
      isStart: row === START_ROW && col === START_COL,
      isEnd: row === END_ROW && col === END_COL,
      isVisited: false,
      distance: Infinity,
      prevNode: null,
      isWall: false,
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

  animatePath(pathInOrder) {
    for (let i = 0; i <= pathInOrder.length; i++) {
      if (i === pathInOrder.length) {
        setTimeout(() => {
          document.getElementById("reset-btn").disabled = false;
        }, 25 * i);
      } else {
        setTimeout(() => {
          document.getElementById(pathInOrder[i]).classList.add("path");
        }, 25 * i);
      }
    }
  }

  animateVisited(visited, pathInOrder) {
    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length) {
        if (!visited[i - 1].isEnd) {
          document.getElementById("message").textContent = "No Path Found";
        }
        setTimeout(() => {
          this.animatePath(pathInOrder);
        }, 15 * i);
      } else {
        setTimeout(function () {
          let id = visited[i].row + "," + visited[i].col;
          document.getElementById(id).classList.add("visited");
        }, 15 * i);
      }
    }
  }

  visualizeDijkstra() {
    document.getElementById("dijkstra-btn").disabled = true;
    document.getElementById("random-btn").disabled = true;
    document.getElementById("reset-btn").disabled = true;
    let { grid } = this.state;
    let start = grid[START_ROW][START_COL];
    let end = grid[END_ROW][END_COL];
    let visited = dijkstra(grid, start, end);
    let node = visited[visited.length - 1];
    let pathInOrder = [];
    if (node === grid[END_ROW][END_COL]) {
      while (node.prevNode !== null) {
        let id = node.row + "," + node.col;
        pathInOrder.push(id);
        node = node.prevNode;
      }
    }
    this.animateVisited(visited, pathInOrder);
  }

  mouseDown(row, col) {
    this.setState({ mousePressed: true });
    let newGrid = this.state.grid;
    let node = newGrid[row][col];
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      let gridNode = document.getElementById(row + "," + col);
      gridNode.classList.toggle("node-wall");
      this.setState({ grid: newGrid });
    }
  }

  mouseEnter(row, col) {
    let newGrid = this.state.grid;
    let node = newGrid[row][col];
    if (this.state.mousePressed && !node.isStart && !node.isEnd) {
      node.isWall = true;
      let gridNode = document.getElementById(row + "," + col);
      gridNode.classList.add("node-wall");
      this.setState({ grid: newGrid });
    }
  }

  mouseUp() {
    this.setState({ mousePressed: false });
  }

  randomPattern() {
    document.getElementById("random-btn").disabled = true;
    let randomGrid = this.state.grid;
    for (let row of randomGrid) {
      for (let node of row) {
        let num = Math.floor(Math.random() * Math.floor(3));
        if (num === 0 && !node.isStart && !node.isEnd) {
          node.isWall = true;
          document.getElementById(node.row + "," + node.col).classList.add("node-wall");
        }
      }
    }
    this.setState({ grid: randomGrid });
  }

  resetGrid() {
    let grid = this.state.grid;
    for (let row of grid) {
      for (let node of row) {
        let currentNode = document.getElementById(node.row + "," + node.col);
        currentNode.classList.remove("visited");
        currentNode.classList.remove("path");
        currentNode.classList.remove("node-wall");
      }
    }
    this.setState({ grid: this.getInitialGrid() });
    document.getElementById("dijkstra-btn").disabled = false;
    document.getElementById("random-btn").disabled = false;
    document.getElementById("message").textContent = "";
  }

  render() {
    let { grid } = this.state;

    return (
      <main>
        <h1>Pathfinder Visualizer</h1>
        <p id="message"></p>
        <button id="dijkstra-btn" class="button" onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's
        </button>
        <button id="reset-btn" class="button" onClick={() => this.resetGrid()}>
          Reset
        </button>
        <button id="random-btn" class="button" onClick={() => this.randomPattern()}>
          Random Pattern
        </button>
        <div id="grid" className="grid">
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
                      isWall={node.isWall}
                      mousePressed={this.state.mousePressed}
                      onMouseDown={(row, col) => this.mouseDown(row, col)}
                      onMouseEnter={(row, col) => this.mouseEnter(row, col)}
                      onMouseUp={() => this.mouseUp()}
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
