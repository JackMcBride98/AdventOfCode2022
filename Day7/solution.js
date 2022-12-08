var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n');
console.log(contents)

let line = 0;
let fileSystem = {totalSize: 0, parent: null};
let directory;
let index = fileSystem;

do {
    if (contents[line].charAt(0) === '$'){
        if (contents[line].slice(2,4) === 'cd'){
            directory = contents[line].split('cd ')[1];
            if (directory === '..'){
                index = index.parent;
            }
            else {
                if (directory !== '/'){
                    index = index[directory]
                }
            }
        }
        if (contents[line].slice(2,4) === 'ls'){
        }
    }
    else {
        let lineSplit = contents[line].split(' ')
        if (lineSplit[0] === 'dir'){
            index[lineSplit[1]] = {parent: index, totalSize: 0};
        }
        else {
            if (parseInt(lineSplit[0]) === NaN){
                console.log("NaN", contents[line])
            }
            index[lineSplit[1]] = parseInt(lineSplit[0])
            index.totalSize += parseInt(lineSplit[0]);
            let temp = index;
            while (temp.parent !== null){
                temp.parent.totalSize += parseInt(lineSplit[0]);
                temp = temp.parent;
            }
        }
    }
    line++;
} while (line < contents.length)

console.log(fileSystem)

let directories = [];
let freeSpace = 70000000 - fileSystem.totalSize;
let requiredSpace = 30000000 - freeSpace;
let possibleDirectorySizes = [];
console.log(requiredSpace)
let count = 0;
directories.push(fileSystem);
while (directories.length > 0){
    let currentDirectory = directories.pop();
    if (currentDirectory.totalSize >= requiredSpace){
        possibleDirectorySizes.push(currentDirectory.totalSize);
    }
    for (const file in currentDirectory){
        if (file !== 'parent' && currentDirectory[file]?.parent){
            directories.push(currentDirectory[file]);
        }
    }
}

console.log(possibleDirectorySizes.sort(function (a, b) {  return a - b;  }))



//Get the directories with a total size of at most 10000


