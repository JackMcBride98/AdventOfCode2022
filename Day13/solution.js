var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(line => line  && JSON.parse(line)).filter(line => line);
// console.log(contents)
const correctOrderIndices = [];
const incorrectOrderIndices = [];

const compareValues = (left, right, index) => {
    // console.log('comparing')
    // console.log(left)
    // console.log('vs')
    // console.log(right)
    if(JSON.stringify(left[index]) === '[]' && JSON.stringify(right[index]) === '[]'){
        return compareValues(left, right, index + 1);
    }
    if (JSON.stringify(left[index]) === '[]' && right[index] !== undefined){
        return compareValues(left, right, index + 1);
    }
    if (JSON.stringify(right[index]) === '[]' && left[index] !== undefined){
        return false;
    }
    if (left[index] === undefined){
        return true;
    }
    if (right[index] === undefined){
        return false;
    }
    if (typeof left[index] === 'number' && typeof right[index] === 'number'){
        if (left[index] < right[index]){
            return true;
        }
        if (left[index] > right[index]){
            return false;
        }
        return compareValues(left, right, index + 1);
    }
    if (Array.isArray(left[index]) && Array.isArray(right[index])){
        return compareValues(left[index], right[index], 0);
    }
    if (Array.isArray(left[index]) && typeof right[index] === 'number'){
        return compareValues(left[index], [right[index]], 0);
    }
    if (Array.isArray(right[index]) && typeof left[index] === 'number'){
        return compareValues([left[index]], right[index], 0);
    }
    console.log("Error")
    // console.log({left, right})
    // console.log(`Comparing ${left} vs ${right}`);
    // console.log(`typeof left is ${Array.isArray(left)} and typeof right is ${typeof right}`);
}

const testIndex = (index) => {
    let left = contents[index - 1];
    let right = contents[index];
    if (compareValues(left, right, 0)){
        correctOrderIndices.push(Math.floor(index/2) + 1);
    }
    else {
        incorrectOrderIndices.push(Math.floor(index/2) + 1);
    }
}
// testIndex(23)

for (let index = 1; index < contents.length; index+=2){
    let left = contents[index-1];
    let right = contents[index];
    if (compareValues(left, right, 0)){
        correctOrderIndices.push(Math.floor(index/2) + 1);
    }
    else {
        incorrectOrderIndices.push(Math.floor(index/2) + 1);
    }

}
console.log(correctOrderIndices)
console.log(incorrectOrderIndices)
console.log(correctOrderIndices.reduce((a,b) => a + b, 0))
