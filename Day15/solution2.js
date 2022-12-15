var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
let sensors = [];
for (let i = 0; i < contents.length; i++){
    let xCoords = contents[i].match(/(?<=x=)(-?\d+)/g).map(x => Math.floor(parseInt(x)));
    let yCoords = contents[i].match(/(?<=y=)(-?\d+)/g).map(y => Math.floor(parseInt(y)));
    sensors.push({x: xCoords[0], y: yCoords[0], closestBeaconX: xCoords[1], closestBeaconY: yCoords[1]});
}

console.log(4000000 * 2844848 + 2658764)
return;

for (let i =0; i < sensors.length; i++){
    sensors[i].manhattanDistance = Math.abs(sensors[i].x - sensors[i].closestBeaconX) + Math.abs(sensors[i].y - sensors[i].closestBeaconY);
}

const isWithinManhattanDistance = (x, y, sensorX, sensorY, manhattanDistance) => {
    return (Math.abs(x - sensorX) + Math.abs(y - sensorY)) <= manhattanDistance;
}

let searchSpace = 4000000;
let points = []
console.log('finding points')
for(const sensor of sensors){
    const {x,y, manhattanDistance} = sensor;
    console.log('sensor', sensor)
    for (let i = x; i < x + manhattanDistance; i++){
        let inverseManhattanDistance = x + manhattanDistance - i;
        // console.log(i, inverseManhattanDistance)
        points.push([ i, y + inverseManhattanDistance + 1])
        points.push([ i, y - inverseManhattanDistance - 1])
    }
    for (let i = y; i < y + manhattanDistance; i++){
        let inverseManhattanDistance = y + manhattanDistance - i;
        // console.log(i, inverseManhattanDistance)
        points.push([ x + inverseManhattanDistance + 1, i])
        points.push([ x - inverseManhattanDistance - 1, i])
    }
}
console.log('points found')
console.log(points.length)

points = points.filter(point => point[0] > 0 && point[1] > 0 && point[0] < searchSpace && point[1] < searchSpace);
console.log(points.length)
let count = 0;
for (point of points) {
    count++;
    console.log(count, 'out of', points.length)
    let isDistress = true;
    for (sensor of sensors) {
        if (isWithinManhattanDistance(point[0], point[1], sensor.x, sensor.y, sensor.manhattanDistance)) {
            isDistress = false;
            break;
        }
    }
    if (isDistress) {
        console.log('we found it bois', point)
        break;
    }
}

