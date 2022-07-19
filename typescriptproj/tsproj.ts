// function add(x: number, y: number) {
//     return x + y;
// }

// const x = 10;
// const y = 4;

// const r = add(x, y);
// console.log(r);

console.log("hey just checking out!!");
var s = 0;
for( let i = 0; i<5; i++) {
    for(let j =0; j<5; j++) {
        s += marks[i][j];
    }
    console.log('The average is : '+ s);
}


for( let i = 0; i<5; i++) {
    var s = 0;
    var avg = [];
    for(let j = 0; j<5; j++) {

        s += marks[i][j];
    }
    avg.push(s/5);
    console.log(avg);
}
