/**
 * This is Dijkstra's algorithm
 */

export function dijkstra(grid, start, end) {
  let unvisited = getAllNodes(grid);
  start.distance = 0;
  let visited = [];
  while (!!unvisited.length) {
    unvisited.sort(function(nodeA, nodeB){return nodeA.distance - nodeB.distance});
    let currentNode = unvisited.shift();
    currentNode.isVisited = true;
    visited.push(currentNode);
    updateNeighbors(grid, currentNode);
    if (currentNode === end) {
      return visited;
    } else if (currentNode.distance === Infinity) {
      return visited
    }
  }
  return visited;
}

function updateNeighbors(grid, node) {
  let neighbors = getNeighbors(grid, node);
  for (let neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.prevNode = node;
  }
}

function getNeighbors(grid, node) {
  let neighbors = [];
  let row = node.row;
  let col = node.col;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  let unvisited = [];
  for (let row of grid) {
    for (let node of row) {
      unvisited.push(node);
    }
  }
  return unvisited;
}