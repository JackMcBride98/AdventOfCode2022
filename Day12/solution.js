var fs = require('fs');
let originalContents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
//Djikstra's algorithm
let distances = [];
for (let i = 0; i < originalContents.length; i++) {
    let contents = JSON.parse(JSON.stringify(originalContents));
    contents[i] = 'S' + contents[i].slice(1);

let nodes = contents.map((line, i) => line.split('').map((char, j) => ({char, height: char === 'E' ? 26 : char==='S' ? 1 : char.charCodeAt(0)-96, distance: char === 'S' ? 0 : Infinity, visited: false, x: j, y: i})));
let startCoords = {x: 0, y: 0};
for ( [ index, line] of nodes.entries()){
    if (line.find(node => node.char === 'S')) {
        startCoords = {x: line.findIndex(node => node.char === 'S'), y: index}
    }
}
let currentCoords = {...startCoords};
let currentNode = nodes[currentCoords.y][currentCoords.x];
let count = 0
    let nodesCount = nodes.flat().length;
while(nodes.flat().some(node => !node.visited) && count < nodesCount) {
    let neighbours = [
        {x: currentNode.x + 1, y: currentNode.y},
        {x: currentNode.x - 1, y: currentNode.y},
        {x: currentNode.x, y: currentNode.y + 1},
        {x: currentNode.x, y: currentNode.y - 1}
    ].filter(neighbour => neighbour.x >= 0 && neighbour.x < nodes[0].length && neighbour.y >= 0 && neighbour.y < nodes.length);
    for (let neighbour of neighbours) {
        let neighbourHeight = nodes[neighbour.y][neighbour.x].height;

        if (neighbourHeight <= currentNode.height + 1 && currentNode.distance + 1 < nodes[neighbour.y][neighbour.x].distance) {
            nodes[neighbour.y][neighbour.x].distance = currentNode.distance + 1;
        }
    }
    console.log(i, count)
    count++;
    currentNode.visited = true;
    currentNode = nodes.flat().filter(node => !node.visited).reduce((min, node) => node.distance < min.distance ? node : min, {distance: Infinity});
}
    console.log(nodes.flat().find(node => node.char === 'E').distance)
    distances.push(nodes.flat().find(node => node.char === 'E').distance)
}
console.log(distances)
console.log(distances.sort((a, b) => a - b))
console.log(distances.sort((a, b) => b - a))