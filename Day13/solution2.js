var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(line => line  && JSON.parse(line)).filter(line => line);
let pairs = [];
contents.push([[2]])
contents.push([[6]])




const compareValues = (left, right) => {
    // console.log('comparing')
    // console.log(left)
    // console.log('vs')
    // console.log(right)
    if (typeof left === 'number' && typeof right === 'number'){
        if (left < right){
            return true;
        }
        if (left > right){
            return false;
        }
        return 'continue';
    }
    if (Array.isArray(left) && Array.isArray(right)){
        let i = 0;
        while (left[i] !== undefined && right[i] !== undefined){
            let result = compareValues(left[i], right[i]);
            if (result !== 'continue'){
                return compareValues(left[i], right[i]);
            }
            i++;
        }
        if (left[i] === undefined && right[i] === undefined){
            return 'continue'
        }
        if (left[i] === undefined && right[i] !== undefined){
            return true;
        }
        if (left[i] !== undefined && right[i] === undefined){
            return false;
        }

        return 'continue';
    }
    if (Array.isArray(left) && typeof right === 'number'){
        return compareValues(left, [right]);
    }
    if (Array.isArray(right) && typeof left === 'number'){
        return compareValues([left], right);
    }
}

contents.sort((a,b) => compareValues(a,b) ? -1 : 1);
console.log(contents.findIndex((item) => JSON.stringify(item) === JSON.stringify([[2]] ) ) + 1)
console.log(contents.findIndex((item) => JSON.stringify(item) === JSON.stringify([[6]] ) ) + 1)

const testIndex = (index) => {
    console.log(compareValues(pairs[index-1].left, pairs[index-1].right)) ;
}


// for (const [index,pair] of pairs.entries()){
//     let result = compareValues(pair.left, pair.right);
//     if (result === 'continue'){
//         console.log("help")
//     }
//     if (result){
//         correctIndices.push(index + 1);
//     }
//     else {
//         incorrectIndices.push(index + 1);
//     }
// }


