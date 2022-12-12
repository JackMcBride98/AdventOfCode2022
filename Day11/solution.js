var fs = require('fs');
let contents = fs
  .readFileSync('input.txt', 'utf8')
  .split('\r\n\r\n')
  .map((monkey) => monkey.split('\r\n').join(''));
const monkeys = [];
for (let i = 0; i < contents.length; i++) {
  monkeys.push({
    items: contents[i]
      .match(/(?<=Starting items: ).*(?=  Operation:)/g)[0]
      .split(', ')
      .map((item) => parseInt(item)),
    operation: (old) =>
      eval(contents[i].match(/(?<=Operation: new = ).*(?=  Test:)/g)[0]),
    test: parseInt(
      contents[i].match(/(?<=Test: divisible by ).*(?=  If true:)/g)[0]
    ),
    ifTrue: parseInt(
      contents[i].match(/(?<=If true: throw to monkey ).*(?=  If false:)/g)[0]
    ),
    ifFalse: parseInt(
      contents[i].match(/(?<=If false: throw to monkey ).*/g)[0]
    ),
    inspectionCount: 0,
  });
}
let factors = monkeys.map((monkey) => monkey.test);
const divider = factors.reduce((a, b) => a * b, 1);

for (let round = 0; round < 10000; round++) {
  for (let i = 0; i < monkeys.length; i++) {
    for (let j = 0; j < monkeys[i].items.length; j += 0) {
      let item = monkeys[i].items.shift();
      monkeys[i].inspectionCount++;
      let newItem = Math.floor(monkeys[i].operation(item)) % divider;
      if (newItem % monkeys[i].test === 0) {
        monkeys[monkeys[i].ifTrue].items.push(newItem);
      } else {
        monkeys[monkeys[i].ifFalse].items.push(newItem);
      }
    }
  }
}

console.log(monkeys);
console.log(monkeys.map((monkey) => monkey.inspectionCount));

const sortedMonkeys = monkeys.sort(
  (a, b) => b.inspectionCount - a.inspectionCount
);
console.log(sortedMonkeys.map((monkey) => monkey.inspectionCount));
console.log(
  sortedMonkeys[0].inspectionCount * sortedMonkeys[1].inspectionCount
);
