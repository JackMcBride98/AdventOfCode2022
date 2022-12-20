var fs = require('fs');
let contents = fs
  .readFileSync('input.txt', 'utf8')
  .split('\r\n')
  .map((line) => ({
    name: line.match(/(?<=Valve )\w*/)[0],
    flowRate: parseInt(line.match(/(?<=rate=)\d*/)[0]),
    leadsTo: line.match(/[A-Z]{2}/g),
  }));
contents.forEach(
  (content) =>
    (content.leadsTo = content.leadsTo.filter((lead) => lead !== content.name))
);
contents.forEach(
  (content) =>
    (content.leadsTo = content.leadsTo.map((lead) =>
      contents.find((content) => content.name === lead)
    ))
);

const calculateDistancesToAllNodesFrom = (startNode) => {
  let distances = {};
  let distance = 1;
  let visitedNodes = [startNode];
  let nodesToVisit = [...startNode.leadsTo];
  while (visitedNodes.length < contents.length) {
    for (const node of [...nodesToVisit]) {
      distances[node.name] = distance;
      nodesToVisit.shift();
      visitedNodes.push(node);
      nodesToVisit.push(
        ...node.leadsTo.filter(
          (node) => !visitedNodes.some((n) => n.name === node.name)
        )
      );
    }
    nodesToVisit = Array.from(new Set(nodesToVisit));
    distance++;
  }
  return distances;
};
let currentNode = contents[0];
let distances = calculateDistancesToAllNodesFrom(currentNode);
let worthWhileNodes = contents.filter((node) => node.flowRate > 0);
worthWhileNodes.push(currentNode);
let worthWhileNodesNames = worthWhileNodes.map((node) => node.name);

let worthWhileMap = [
  ...worthWhileNodes.map((node) => {
    let newNode = { ...node };
    let distances = calculateDistancesToAllNodesFrom(node);
    newNode.leadsTo = {};
    for (const key in distances) {
      if (worthWhileNodesNames.includes(key)) {
        newNode.leadsTo[key] = distances[key];
      }
    }
    return newNode;
  }),
];

let maxValues = [];

//Depth first search
const DFS = (node, time, totalPresureReleased, unvisitedNodes, path) => {
  if (unvisitedNodes.length === 0) {
    maxValues.push({ totalPresureReleased, path });
  }
  for (const [index, unvisitedNode] of unvisitedNodes.entries()) {
    let newUnvisitedNodes = [...unvisitedNodes];
    newUnvisitedNodes.splice(index, 1);
    let newTime = time - node.leadsTo[unvisitedNode.name] - 1;
    let newPath = [...path, unvisitedNode.name];
    if (newTime > 0) {
      DFS(
        unvisitedNode,
        newTime,
        totalPresureReleased + newTime * unvisitedNode.flowRate,
        newUnvisitedNodes,
        newPath
      );
    } else {
      maxValues.push({ totalPresureReleased, path });
    }
  }
};

DFS(worthWhileMap.pop(), 26, 0, worthWhileMap, []);

maxValues.sort((a, b) => b.totalPresureReleased - a.totalPresureReleased);

console.log(maxValues[0].totalPresureReleased);

let bestNonOverlappingPathScore = 0;

const doPathsOverlap = (path1, path2) => {
  for (const node of path1) {
    if (path2.includes(node)) {
      return true;
    }
  }
  return false;
};

for (let i = 0; i < maxValues.length - 1; i++) {
  if (
    maxValues[i].totalPresureReleased + maxValues[0].totalPresureReleased <
    bestNonOverlappingPathScore
  ) {
    break;
  }
  for (let j = 0; j < maxValues.length - 1; j++) {
    if (
      maxValues[i].totalPresureReleased + maxValues[j].totalPresureReleased <
      bestNonOverlappingPathScore
    ) {
      break;
    }
    if (!doPathsOverlap(maxValues[i].path, maxValues[j].path)) {
      let newTotalPressureReleased =
        maxValues[i].totalPresureReleased + maxValues[j].totalPresureReleased;
      if (newTotalPressureReleased > bestNonOverlappingPathScore) {
        bestNonOverlappingPathScore = newTotalPressureReleased;
        console.log('found');
      }
    }
  }
}

console.log(bestNonOverlappingPathScore);
