var fs = require('fs');

const isUpperCase = (str) => str.toUpperCase() === str;

let contents = fs
  .readFileSync('input.txt', 'utf8')
  .split('\r\n')
  .map((string) => [
    string.slice(0, string.length / 2),
    string.slice(string.length / 2),
  ]);

let typeSum = 0;

for (let i = 0; i < contents.length; i++) {
  let j = 0;
  while (!contents[i][1].includes(contents[i][0][j])) {
    j++;
  }
  if (isUpperCase(contents[i][0][j])) {
    typeSum += contents[i][0][j].charCodeAt(0) - 38;
  } else {
    typeSum += contents[i][0][j].charCodeAt(0) - 96;
  }
}
console.log(typeSum);
