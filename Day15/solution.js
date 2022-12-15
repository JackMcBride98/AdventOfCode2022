var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
let sensors = [];
for (let i = 0; i < contents.length; i++){
    let xCoords = contents[i].match(/(?<=x=)(-?\d+)/g).map(x => Math.floor(parseInt(x)));
    let yCoords = contents[i].match(/(?<=y=)(-?\d+)/g).map(y => Math.floor(parseInt(y)));
    sensors.push({x: xCoords[0], y: yCoords[0], closestBeaconX: xCoords[1], closestBeaconY: yCoords[1]});
}
let allXCoords = [...sensors.map(sensor => sensor.x), ...sensors.map(sensor => sensor.closestBeaconX)];
let allYCoords = [...sensors.map(sensor => sensor.y), ...sensors.map(sensor => sensor.closestBeaconY)];
// let minX = Math.min(...allXCoords);
// let maxX = Math.max(...allXCoords) ;

// const map = new Array((maxY - minY) + 1).fill(0).map(() => new Array((maxX - minX) + 1).fill('.'));
// console.log(map[2000000 - minY].filter(x => x === '#').length)
// let row = new Array((maxX - minX) + 1).fill('.')
const printMap = () => {
    for (let i = 0; i < map.length; i++){
        console.log(map[i].join(''));
    }
}

const isWithinManhattanDistance = (x, y, sensorX, sensorY, manhattanDistance) => {
    return (Math.abs(x - sensorX) + Math.abs(y - sensorY)) <= manhattanDistance;
}

const searchSpace = 4000000;
let minX = 0;
let maxX = searchSpace;
let minY = 0;
let maxY = searchSpace;
console.log(minX, maxX, minY, maxY)
let map = []
for (let i = 0; i < searchSpace; i++){
    map[i] = []
    for (let j = 0; j < searchSpace; j++){
        map[i][j] = '.';
    }
    console.log(i)
}
// const map = new Array((searchSpace)).fill(0).map(() => new Array((searchSpace)).fill('.'));

console.log('map made');
// printMap()

const rowNumber = 2000000 - minY;
// printMap()
for (let i = 0; i < sensors.length; i++){
    sensors[i].x = sensors[i].x - minX;
    sensors[i].y = sensors[i].y - minY;
    sensors[i].closestBeaconX = sensors[i].closestBeaconX - minX;
    sensors[i].closestBeaconY = sensors[i].closestBeaconY - minY;
    if (sensors[i].y  > 0 && sensors[i].y < searchSpace && sensors[i].x > 0 && sensors[i].x < searchSpace){
        map[sensors[i].y][sensors[i].x] = 'S';
    }
    if (sensors[i].closestBeaconY  > 0 && sensors[i].closestBeaconY < searchSpace && sensors[i].closestBeaconX > 0 && sensors[i].closestBeaconX < searchSpace){
        map[sensors[i].closestBeaconY][sensors[i].closestBeaconX] = 'B';
    }
    let xDiff = Math.abs(sensors[i].x - sensors[i].closestBeaconX);
    let yDiff = Math.abs(sensors[i].y - sensors[i].closestBeaconY);
    let manhattanDistance = xDiff + yDiff;
    for (let j = 0; j < searchSpace; j++){
        for (let k = 0; k < searchSpace; k++){
            if (isWithinManhattanDistance(k, j, sensors[i].x, sensors[i].y, manhattanDistance)){
                if (map[j][k] === '.'){
                    map[j][k] = '#';
                }
            }
        }
    }
    // map[sensors[i].y][sensors[i].x] = 'S';
    // map[sensors[i].closestBeaconY][sensors[i].closestBeaconX] = 'B';
}
for (let i =6; i < 7; i++){
    if(

    map[i].findIndex((el) => el === '.') > 0
    ){
        console.log(map[i].findIndex(el => el === '.'), i, map[i].findIndex(el => el === '.') * 4000000 +  i)
    }
}


// printMap();
const markPosition = (x, y) => {
    if (map[y][x] === '.'){
        map[y][x] = '#';
    }
}
// for (let i =0; i < sensors.length; i++){
//     let xDiff = Math.abs(sensors[i].x - sensors[i].closestBeaconX);
//     let yDiff = Math.abs(sensors[i].y - sensors[i].closestBeaconY);
//     let manhattanDistance = xDiff + yDiff;
//     for (let j = 0; j <= manhattanDistance; j++){
//         for (let k = 0; k <= manhattanDistance - j; k++){
//             markPosition(sensors[i].x + j, sensors[i].y + k);
//             markPosition(sensors[i].x - j, sensors[i].y + k);
//             markPosition(sensors[i].x + j, sensors[i].y - k);
//             markPosition(sensors[i].x - j, sensors[i].y - k);
//
//         }
//     }
// }
// printMap()
// console.log(minX, maxX, minY, maxY)
// console.log(map[2000000 - minY].filter(x => x === '#').length)
// console.log(contents)
// console.log(sensors)