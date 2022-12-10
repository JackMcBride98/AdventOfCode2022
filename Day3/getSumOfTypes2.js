var fs = require('fs');

const isUpperCase = (str) => str.toUpperCase() === str;

let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
let typeSum = 0;
for (let i = 0; i < contents.length; i++) {
  contents[i] = [contents[i], contents[i + 1], contents[i + 2]];
  contents.splice(i + 1, 2);
  for (let j = 0; j < contents[i][0].length; j++) {
    if (
      contents[i][1].includes(contents[i][0][j]) &&
      contents[i][2].includes(contents[i][0][j])
    ) {
      if (isUpperCase(contents[i][0][j])) {
        typeSum += contents[i][0][j].charCodeAt(0) - 38;
      } else {
        typeSum += contents[i][0][j].charCodeAt(0) - 96;
      }
      break;
    }
  }
}

console.log(typeSum);

// for (let i = 0; i < contents.length; i++) {
//   let j = 0;
//   while (!contents[i][1].includes(contents[i][0][j])) {
//     j++;
//   }
//   if (isUpperCase(contents[i][0][j])) {
//     typeSum += contents[i][0][j].charCodeAt(0) - 38;
//   } else {
//     typeSum += contents[i][0][j].charCodeAt(0) - 96;
//   }
// }
// console.log(typeSum);
