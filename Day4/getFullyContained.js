var fs = require('fs');

let contents = fs
  .readFileSync('input.txt', 'utf8')
  .split('\r\n')
  .map((str) =>
    str.split(',').map((range) => range.split('-').map((num) => parseInt(num)))
  );

// let count = 0;
// for (let i = 0; i < contents.length; i++) {
//   let [firstRange, secondRange] = contents[i];
//   if (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1]) {
//     count++;
//     continue;
//   }
//   if (secondRange[0] >= firstRange[0] && secondRange[1] <= firstRange[1]) {
//     count++;
//     continue;
//   }
// }

let count2 = 0;

for (let i = 0; i < contents.length; i++) {
  let [firstRange, secondRange] = contents[i];
  if (firstRange[0] >= secondRange[0] && firstRange[0] <= secondRange[1]) {
    count2++;
    continue;
  }
  if (firstRange[1] >= secondRange[0] && firstRange[1] <= secondRange[1]) {
    count2++;
    continue;
  }
  if (secondRange[0] >= firstRange[0] && secondRange[0] <= firstRange[1]) {
    count2++;
    continue;
  }
  if (secondRange[1] >= firstRange[0] && secondRange[1] <= firstRange[1]) {
    count2++;
    continue;
  }
}

console.log(count2);
