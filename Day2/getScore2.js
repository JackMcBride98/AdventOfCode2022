var fs = require('fs');

let contents = fs.readFileSync('StrategyGuide.txt', 'utf8').split('\r\n').map(s => s.split(' '));
let totalScore = 0;
for (let i = 0; i < contents.length; i++) {
    if (contents[i][1] === 'X'){
        if (contents[i][0] === 'A'){
            totalScore += 3;
        }
        if (contents[i][0] === 'B'){
            totalScore += 1;
        }
        if (contents[i][0] === 'C'){
            totalScore += 2;
        }
    }
    if (contents[i][1] === 'Y'){
        if (contents[i][0] === 'A'){
            totalScore += 4;
        }
        if (contents[i][0] === 'B') {
            totalScore += 5;
        }
        if (contents[i][0] === 'C'){
            totalScore += 6;
        }
    }
    if (contents[i][1] === 'Z'){
        if (contents[i][0] === 'A'){
            totalScore += 8;
        }
        if (contents[i][0] === 'B'){
            totalScore += 9;
        }
        if (contents[i][0] === 'C'){
            totalScore += 7;
        }
    }
}
console.log(totalScore);