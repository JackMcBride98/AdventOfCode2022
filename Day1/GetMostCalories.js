var fs = require('fs');

let contents = fs.readFileSync('CalorieData.txt', 'utf8').split('\r\n').map(s => parseInt(s));
let totalCalories = []
let count = 0;
for (let i = 0; i < contents.length; i++) {
    if (contents[i]) {
        count += contents[i];
    }
    else {
        totalCalories.push(count);
        count = 0;
    }
}
totalCalories.push(count);
totalCalories.sort((a, b) => b - a);
console.log(totalCalories.slice(0,3).reduce((a, b) => a + b));