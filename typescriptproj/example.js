"use strict";
// function add(x: number, y: number, showr: boolean, sent: string) { //datatypes
//     const r = x+y ;
//     if(showr) {
//         console.log(sent + r);
//     }
//     else {
//         return x + y;
//     }
// }
// const x = 3;
// const y = 4;
// const printr = true;
// const rsent='The result is: ';
// add(x,y, printr, rsent);
// const stationary = { //objects
//     name: 'Pencil',
//     nos: 10,
//     brands: ['DOMs', 'Natraj', 'Apsara','Camlin']
// };
// for (const brand of stationary.brands) {
//     console.log(brand.toLowerCase());   
// }
// type combinable = number | string;
// function add(x: combinable, y: combinable) { //union types
//     let result;
//     if(typeof x === 'number' && typeof y === 'number') {
//         result = x+y;
//     }
//     else {
//         result = x.toString() + y.toString();
//     }
//     return result;
// }
// const addname = add('Jef',' Saddman');
// console.log(addname);
// const addage = add(34, 47);
// console.log(addage);
// const multiply = function (x : number, y : number) { //without arrow
//     return x*y;
// };
// console.log(multiply(7, 7));
// const multiply = (x : number, y : number) => x*y; //with arrow for one expression alone you don't need a body..but for multiple expressions you need a body
// console.log(multiply(7, 8));
//  class Stud {
//      private Sname: string[] = [];
//      constructor (public grade:number) {
//          this.grade = grade;
//       }
//       describe(this: Stud) {
//           console.log("Students of Grade: " + this.grade)
//       }
//       addSname(Sname: string) {
//           this.Sname.push(Sname); 
//       }
//       printSnameInfo() { 
//           console.log(this.Sname.length);
//           console.log(this.Sname);
//       }
//  }
// class Spostud extends Stud {
//     constructor(grade: number) {
//         super(8);   
//     }
// }
//  const S1 = new Spostud(8);
// S1.describe();
// S1.addSname('Denis');
// S1.addSname('Harry');
// S1.addSname('Jerry');
// // S1.Sname[2] = 'Jerry'; //this method can be used for public objects..if private the previous line method is used
// S1.printSnameInfo();
// type stud1 = { //interface
//     Sname: string;
//     StuID: String;
//     Grade: number; 
// };
// type Sdetails = {
//     Sname: string;
//     marks: number[];
// };
// type Stu1rec = stud1 & Sdetails;
// const student1: Stu1rec = {
//     Sname: 'Harry',
//     StuID: '123A098',
//     Grade: 10,
//     marks: [55, 80, 69, 83, 77]
// };
// console.log(student1);
// let sum=0;
// for(let i=0; i<student1.marks.length; i++)
// {
//     sum+= student1.marks[i];
// }
// const m1 = console.log("The average mark of studemt 1 is : " + sum/5)
// interface bird { //discriminated unions
//     type: 'B';
//     flightspeed: number;
// }
// interface horse {
//     type: 'A';
//     runspeed: number;
// }
// type animal = bird | horse;
// function animalspeed( animal: animal) {
//     let s;
//     switch (animal.type) {
//         case 'B':
//             s = animal.flightspeed;
//             break;
//         case 'A':
//             s = animal.runspeed;
//             break;
//     }
//     console.log('Moves at speed: ' + s);
// }
// animalspeed({type: 'A', runspeed: 20});  
// let intext = document.getElementById('input')! as HTMLInputElement;  //type casting
// intext.value = 'jsdj';
// let intext = document.getElementById('input')! ;  //type casting
// if(intext ) {
//     (intext as HTMLInputElement).value = 'HELLO!' ;
// }
// function combine<X, Y>(A: X, B: Y) { //create generic function
//     return Object.assign(A, B);
// }
// const C = combine({color:'Purple', stat : ['Sketch', 'pencil', 'crayon']}, {nos:20} );
// console.log(C.stat);
// class H<T> {
//     private details: T[] = [];
//     addItem(item: T) {
//         this.details.push(item);
//     }
//     removeItem(item:T) {
//         this.details.splice(this.details.indexOf(item), 1);
//     }
//     getItems() {
//         return[...this.details];
//     }
// }
// const data1 = new H<string | number>();
// data1.addItem('Jenna');
// data1.addItem('Covey');
// data1.addItem('hey');
// data1.addItem('hy');
// data1.addItem('hehee');
// data1.removeItem("hy");
// console.log(data1.getItems());
// function demo(constructor: Function) { //decoratorss
//     console.log('Demo decorator');
//     console.log(constructor);
// }
// demo 
// class person {
//     name = 'Lilly';
//     constructor() {
//         console.log('On process');
//     }
// }
// const p = new person();
// console.log(p);
// function demo(dsrt: string) { //decorators factory
//     return function(constructor: Function) {
//         console.log(dsrt);
//         console.log(constructor);
//     };
// }
// demo('Demo Decorator Factory Function')
//# sourceMappingURL=example.js.map