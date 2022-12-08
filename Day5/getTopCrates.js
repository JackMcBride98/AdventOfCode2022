var fs = require('fs');

let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');

let count = 0;

let stackContentsInput = [];

while (contents[count].charAt(1) !== '1') {
    stackContentsInput.push(contents[count].match(/.{1,4}/g));
    count++;
}

console.log(stackContentsInput)

let stacks = new Array(stackContentsInput[0].length).fill([]).map(() => new Array());

for (let i = 0; i < stackContentsInput.length; i++) {
    for (let j = 0; j < stackContentsInput[i].length; j++) {
        if (stackContentsInput[i][j].charAt(0) === '[') {
            stacks[j].unshift(stackContentsInput[i][j].charAt(1));
        }
    }
}

console.log(stacks)
console.log(contents[count + 2])
console.log(count)

for (let i = count + 2; i < contents.length; i++) {
    let move = parseInt(contents[i].match(/(?<=move )\d*/g)[0]);
    let from = parseInt(contents[i].match(/(?<=from )\d*/g)[0]) - 1;
    let to = parseInt(contents[i].match(/(?<=to )\d*/g)[0]) - 1;

    stacks[to].push(...stacks[from].splice(-move));

    console.log(stacks)
}

console.log(stacks.map(stack => stack.pop()).join(''))



