// function add(x: number, y: number, showr: boolean, sent: string) { //datatypes
//     const r = x+y ;
//     if(showr) {
//         console.log(sent + r);
//     }
//     else {
//         return x + y;
//     }
// }
var student1 = {
    Sname: 'Harry',
    StuID: '123A098',
    Grade: 10,
    marks: [78, 89, 75, 85, 80]
};
console.log(student1);
var sum = 0;
for (var i = 0; i < student1.marks.length; i++) {
    sum += student1.marks[i];
}
console.log("The average mark of studemt 1 is : " + sum / 5);
