var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
let headCoords = {x: 0, y: 0};
let tailCoords = {x: 0, y: 0};
let tailLocationsVisited = [];
tailLocationsVisited.push({...tailCoords})

const isTouching = (headCoords, tailCoords) => {
    if (headCoords.x <= tailCoords.x + 1 && headCoords.x >= tailCoords.x - 1 && headCoords.y <= tailCoords.y + 1 && headCoords.y >= tailCoords.y - 1) {
        return true;
    }
    return false;
}

const updateTailCoords = (headCoords) => {
    console.log('updating tail coords, head is at ', headCoords)
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
    console.log('new tail coords are ', tailCoords)

    if (!tailLocationsVisited.some((coord) => coord.x === tailCoords.x && coord.y === tailCoords.y)) {
        tailLocationsVisited.push({...tailCoords});
    }
    }
}

for (let i =0; i < contents.length; i++){
    let [direction, distance] = contents[i].split(' ');
    if (direction === 'R') {
        for (let j = 0; j < distance; j++) {
            headCoords.x++;
            updateTailCoords(headCoords);
        }
    }
    if (direction === 'L') {
        for (let j = 0; j < distance; j++) {
            headCoords.x--;
            updateTailCoords(headCoords);
        }
    }
    if (direction === 'U') {
        for (let j = 0; j < distance; j++) {
            headCoords.y++;
            updateTailCoords(headCoords);
        }
    }
    if (direction === 'D') {
        for (let j = 0; j < distance; j++) {
            headCoords.y--;
            updateTailCoords(headCoords);
        }
    }
}

console.log(tailLocationsVisited.length)
