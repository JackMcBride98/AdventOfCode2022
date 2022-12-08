var fs = require('fs');
let contents = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(string => string.split('').map(char => ({height: parseInt(char), left: 0, right: 0, top: 0, bottom: 0})));

for (let i = 1; i < contents.length - 1; i++) {
    let maxTreeHeight = contents[i][0].height;
    for (let j = 1; j < contents[i].length -1; j++) {
        if (contents[i][j].height > maxTreeHeight) {
            maxTreeHeight = contents[i][j].height;
        }
        else {
            contents[i][j].left = false;
        }
    }
}

for (let i = 1; i < contents.length - 1; i++) {
    let width = contents[i].length;
    let maxTreeHeight = contents[i][width-1].height;
    for (let j = width - 2; j > 0; j--) {
        if (contents[i][j].height > maxTreeHeight) {
            maxTreeHeight = contents[i][j].height;
        }
        else {
            contents[i][j].right = false;
        }
    }
}

for (let i = 1; i < contents[0].length - 1; i++) {
    let maxTreeHeight = contents[0][i].height;
    for (let j = 1; j < contents.length - 1; j++) {
        if (contents[j][i].height > maxTreeHeight) {
            maxTreeHeight = contents[j][i].height;
        }
        else {
            contents[j][i].top = false;
        }
    }
}

for (let i = 1; i < contents[0].length - 1; i++) {
    let height = contents.length;
    let maxTreeHeight = contents[height-1][i].height;
    for (let j = height - 2; j > 0; j--) {
        if (contents[j][i].height > maxTreeHeight) {
            maxTreeHeight = contents[j][i].height;
        }
        else {
            contents[j][i].bottom = false;
        }
    }
}

let visibleCount = 0;
for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents[i].length; j++) {
        console.log(contents[i][j])
        if (contents[i][j].left || contents[i][j].right || contents[i][j].top || contents[i][j].bottom) {
            visibleCount++;
        }
    }
}

for (let i = 0; i < contents.length ; i++){
    for (let j = 0; j < contents[i].length; j++) {
        let k = 1;
        while (true){
            if (contents[i][j-k]){
                contents[i][j].left++;
                if (contents[i][j-k].height >= contents[i][j].height) {
                    break;
                }
            }
            else {
                break;
            }
            k++;
        }
        k= 1;
        while (true){
            if (contents[i][j+k]){
                contents[i][j].right++;
                if (contents[i][j+k].height >= contents[i][j].height) {
                    break;
                }
            }
            else {
                break;
            }
            k++;
        }
        k= 1;
        while (true){
            if (contents[i-k] && contents[i - k][j]){
                contents[i][j].top++;
                if (contents[i - k][j].height >= contents[i][j].height) {
                    break;
                }
            }
            else {
                break;
            }
            k++;
        }
        k=1;
        while (true){
            if (contents[i+k] && contents[i + k][j]){
                contents[i][j].bottom++;
                if (contents[i + k][j].height >= contents[i][j].height) {
                    break;
                }
            }
            else {
                break;
            }
            k++;
        }

    }
}
console.log(contents.map(row => row.map(tree => tree.left * tree.right * tree.top * tree.bottom)).flat().sort((a,b) => a - b ).pop())



