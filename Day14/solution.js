var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(line => line.split('->').map(item => item.split(',').map(item => parseInt(item))));

const sandGeneratorCoords = [500, 0];
let allXCoords = [...contents.flat().map(coord => coord[0])];
allXCoords.push(sandGeneratorCoords[0])
let minX = Math.min(...allXCoords) - 3000;
let maxX = Math.max(...allXCoords) + 3000;
let allYCoords = [...contents.flat().map(coord => coord[1])];
allYCoords.push(sandGeneratorCoords[1]);
let minY = Math.min(...allYCoords);
let maxY = Math.max(...allYCoords) + 2;

const map = new Array((maxY - minY) + 1).fill(0).map(() => new Array((maxX - minX) + 1).fill('.'));
map[sandGeneratorCoords[1]][sandGeneratorCoords[0] - minX] = '+';

const printMap = () => {
    for (let i = 0; i < map.length; i++){
        console.log(map[i].join(''));
    }
}


const drawLine = (x1, y1, x2, y2) => {
    if (x1 === x2){
        for (let i = Math.min(y1,y2); i <= Math.max(y1,y2); i++){
            map[i][x1] = '#';
        }
    }
    if (y1 === y2){
        for (let i = Math.min(x1,x2); i <= Math.max(x1,x2); i++){
            map[y1][i] = '#';
        }
    }
}

drawLine(0, maxY , maxX - minX, maxY);
// contents.push([[minX , maxY+1], [maxX, maxY+1]]);

for (let i = 0; i < contents.length; i++){
    for (let j = 0; j < contents[i].length - 1; j++){
        drawLine(contents[i][j][0] - minX, contents[i][j][1] - minY, contents[i][j+1][0] - minX, contents[i][j+1][1] - minY);
    }
}

printMap()

const drawSand = (x, y) => {
    map[y][x] = 'o'
}

let sandhasBlockedTheSource = false;

sandGeneratorCoords[0] = sandGeneratorCoords[0] - minX;
sandGeneratorCoords[1] = sandGeneratorCoords[1] - minY;

count = 0;


console.log(sandGeneratorCoords)
while (!sandhasBlockedTheSource) {
    let sandIsFalling = true;
    let newSand = [sandGeneratorCoords[0], sandGeneratorCoords[1]];
    while (sandIsFalling) {
        if (map[newSand[1] + 1] === undefined) {
            console.log("its all over count is ", count)
            sandhasBlockedTheSource = true;
            sandIsFalling = false;
        } else if (map[newSand[1] + 1][newSand[0]] === '.') {
            newSand[1] += 1;
        } else if (
            map[newSand[1] + 1][newSand[0] - 1] === '.'
        ) {
            newSand[0] -= 1;
            newSand[1] += 1;
        } else if (
            map[newSand[1] + 1][newSand[0] + 1] === '.'
        ) {
            newSand[0] += 1;
            newSand[1] += 1;
        } else if (newSand[1] + 1 > map.length || newSand[0] + 1 > map[0].length || newSand[0] - 1 < 0) {
            console.log("end", count)
            sandhasBlockedTheSource = true;
            sandIsFalling = false;
        } else {
            sandIsFalling = false;
        }
    }
    console.log(count)
    count++;
    drawSand(newSand[0], newSand[1]);
    if (newSand[0] === sandGeneratorCoords[0] && newSand[1] === sandGeneratorCoords[1]){
        sandhasBlockedTheSource = true;
    }
    // printMap()
}
// console.log(count)
for (let i = 0; i < 3; i++){
    console.log(map[i].join(''));
}