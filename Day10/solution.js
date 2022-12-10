var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');

let cycleNumber = 0;
let xRegister = 1;
let signalStrengths = [];
let screen = new Array(40 * 6).fill('.').map((char) => '.');
screen[256] = '#';
const printScreen = () => {
  for (let i = 0; i < 6; i++) {
    console.log(screen.slice(i * 40, (i + 1) * 40).join(''));
  }
};

const checkCycleNumber = () => {
  if ((cycleNumber + 20) % 40 === 0) {
    signalStrengths.push(xRegister * cycleNumber);
  }
  if (cycleNumber % 40 >= xRegister && cycleNumber % 40 < xRegister + 3) {
    screen[cycleNumber - 1] = '#';
  }
};

for (let i = 0; i < contents.length; i++) {
  if (contents[i] === 'noop') {
    cycleNumber++;
    checkCycleNumber();
  }
  if (contents[i].includes('addx')) {
    cycleNumber++;
    checkCycleNumber();
    cycleNumber++;
    checkCycleNumber();
    xRegister += parseInt(contents[i].split(' ')[1]);
  }
}

printScreen();
