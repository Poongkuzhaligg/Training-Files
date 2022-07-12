// function add(x: number, y: number, showr: boolean, sent: string) { //datatypes
//     const r = x+y ;
//     if(showr) {
//         console.log(sent + r);
//     }
//     else {
//         return x + y;
//     }
// }
function add(x, y) {
    var result;
    if (typeof x === 'number' && typeof y === 'number') {
        result = x + y;
    }
    else {
        result = x.toString() + y.toString();
    }
    return result;
}
var addname = add('Jef', ' Sadman');
console.log(addname);
var addage = add(34, 47);
console.log(addage);
