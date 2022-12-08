var fs = require('fs');

let contents = fs.readFileSync('StrategyGuide.txt', 'utf8').split('\r\n').map(s => s.split(' '));
let totalScore = 0;
for (let i = 0; i < contents.length; i++) {
    if (contents[i][1] === 'X'){
        totalScore += 1;
        if (contents[i][0] === 'A'){
            totalScore += 3;
        }
        if (contents[i][0] === 'C'){
            totalScore += 6;
        }
    }
    if (contents[i][1] === 'Y'){
        totalScore += 2;
        if (contents[i][0] === 'A'){
            totalScore += 6;
        }
        if (contents[i][0] === 'B') {
        totalScore += 3;
        }
    }
    if (contents[i][1] === 'Z'){
        totalScore += 3;
        if (contents[i][0] === 'B'){
            totalScore += 6;
        }
        if (contents[i][0] === 'C'){
            totalScore += 3;
        }
    }
}
console.log(totalScore);