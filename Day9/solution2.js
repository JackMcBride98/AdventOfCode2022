var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
let knotsCoords = Array(10).fill(0).map(() => ({x: 0, y: 0}));
let head = knotsCoords[0]
let tail = knotsCoords[9];
let tailLocationsVisited = [];
tailLocationsVisited.push({...knotsCoords[9]})

const isTouching = (headCoords, tailCoords) => {
    if (headCoords.x <= tailCoords.x + 1 && headCoords.x >= tailCoords.x - 1 && headCoords.y <= tailCoords.y + 1 && headCoords.y >= tailCoords.y - 1) {
        return true;
    }
    return false;
}

const updateTailCoords = (headCoords, tailCoords) => {
    if (!isTouching(headCoords, tailCoords)) {
        if (headCoords.x > tailCoords.x) {
            tailCoords.x++;
        }
        if (headCoords.x < tailCoords.x) {
            tailCoords.x--;
        }
        if (headCoords.y > tailCoords.y){
            tailCoords.y++;
        }
        if (headCoords.y < tailCoords.y) {
            tailCoords.y--;
        }
    }
}

for (let i =0; i < contents.length; i++){
    let [direction, distance] = contents[i].split(' ');
    if (direction === 'R') {
        for (let j = 0; j < distance; j++) {
            head.x++;
            for (let k = 0; k < knotsCoords.length - 1; k++) {
                updateTailCoords(knotsCoords[k], knotsCoords[k+1]);
            }
            if (!tailLocationsVisited.some((coord) => coord.x === tail.x && coord.y === tail.y)) {
                tailLocationsVisited.push({...tail});
            }
        }
    }
    if (direction === 'L') {
        for (let j = 0; j < distance; j++) {
            head.x--;
            for (let k = 0; k < knotsCoords.length - 1; k++) {
                updateTailCoords(knotsCoords[k], knotsCoords[k+1]);
            }
            if (!tailLocationsVisited.some((coord) => coord.x === tail.x && coord.y === tail.y)) {
                tailLocationsVisited.push({...tail});
            }
        }
    }
    if (direction === 'U') {
        for (let j = 0; j < distance; j++) {
            head.y++;
            for (let k = 0; k < knotsCoords.length - 1; k++) {
                updateTailCoords(knotsCoords[k], knotsCoords[k+1]);
            }
            if (!tailLocationsVisited.some((coord) => coord.x === tail.x && coord.y === tail.y)) {
                tailLocationsVisited.push({...tail});
            }
        }
    }
    if (direction === 'D') {
        for (let j = 0; j < distance; j++) {
            head.y--;
            for (let k = 0; k < knotsCoords.length - 1; k++) {
                updateTailCoords(knotsCoords[k], knotsCoords[k+1]);
            }
            if (!tailLocationsVisited.some((coord) => coord.x === tail.x && coord.y === tail.y)) {
                tailLocationsVisited.push({...tail});
            }
        }
    }

}

console.log(tailLocationsVisited.length)
