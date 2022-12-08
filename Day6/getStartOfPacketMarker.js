var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8');
const isAllDifferent = (str) => {
    let chars = str.split('');
    let set = new Set(chars);
    return set.size === chars.length;
}
let i = 14;
let recent4 = contents.slice(i-14,i);
while ( !isAllDifferent(recent4) ) {
    i++;
    recent4 = contents.slice(i-14,i);
}
console.log(i)
