class Car {
    constructor(name, year) {
      this.name = name;
      this.year = year;
      console.log("constructor called")
    }
    age() {
      let date = new Date();
      return date.getFullYear() - this.year;
    }
  }
  
  let myCar = new Car("Ford", 2014);
  console.log(" name: " + myCar.name + " age: " + myCar.age() + " year: " + myCar.year);

// function myDisplayer(some) {
// }
function myCalculator(num1, num2) {
    let sum = num1 + num2;
    return sum;
}
let result = console.log(myCalculator(5,5))
//myDisplayer(result);

