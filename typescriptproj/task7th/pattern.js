// let n = 6;
// var r,c,k;
// let str = "";
// for(r=1; r<=n; r++) //pyramid
// {
//     for(c=1; c<=n-r; c++) 
//     {
//         str +=" ";
//     }
//     for(k=0; k<2*r-1; k++)
//     {
//         str +="*";
//     }
//     str +="\n";
// }

// var revstring = function(str) { //reverse a string
//     let arr = str.split("");
//     arr.reverse();
//     str = arr.join("");
//     console.log(str);
// }
// revstring("hello there!");

// for(r=1; r<=n; r++){ // left increasing
//     for(c=1; c<=r; c++){
//         str+="*";
//     }
//     str+="\n";
// }

// for(r=1; r<=n; r++){ // left decreasing
//     for(c=r; c<=n; c++){
//         str+="*";
//     }
//     str+="\n";
// }


// for(r=1; r<=n; r++){ // right increasing
//     for(c=r; c<=n; c++){
//         str+=" ";
//     }
//     for(k=1; k<=r;k++){
//         str+="*";
//     }
//     str+="\n";
// }

// for(r=1; r<=n; r++){ // right decreasing
//     for(c=1; c<=r; c++){
//         str+=" ";
//     }
//     for(k=r; k<=n;k++){
//         str+="*";
//     }
//     str+="\n";
// }

// let x = 0, y = 1, z, n = 10; //fibonacci
// var i;
// for( i=1; i<=n; i++) {
//     console.log(x);
//     z = x+y;
//     x = y;
//     y = z;
// }

// console.log(str);
// document.getElementById("star").innerHTML = str;

// const str = "rise and shine";  //first letter caps
// const words = str.split(" ");
// for(let i = 0; i < words.length; i++){
//     words[i] = words[i][0].toUpperCase() + words[i].slice(1);
// }

// console.log(words);

// var dob = new Date("06/23/2000");  //age
// var month_diff = Date.now() - dob.getTime();  
// var age_dt = new Date(month_diff);   
// var year = age_dt.getFullYear();  
// var age = Math.abs(year - 1970);  
// console.log("The age of the user is:" + age +"years");

// let r = 8; // area and pm of circle
// console.log("The area of circle is:" + Math.PI * r * r);
// console.log("The perimeter of circle is:" + 2 * Math.PI * r);  

// let celsius = 60; //degree to celsius
// const fahrenheit = (celsius*1.8) +32;
// console.log(celsius + " degree celsius is equal to " + fahrenheit + " fahrenheit!");

// let palindrome = function(str) { //is palindrome or not
//     var ispalindrome = str.split("").reverse().join("");
//     console.log(str===ispalindrome);
// }
// palindrome("7585");

// let factorial = function(num) { //factorial
//     var r = 1;
//     for(var i=1; i<=num; i++) {
//         r *= i;
//     }
//     console.log(r);
// } 
// factorial(5);

// let multiplication = function(num) {
//     for(let i=1; i<=10; i++) {
//         var r = i*num;
//     }
//     console.log(r);
// }
// multiplication(10);

let a = [ [5, 8,3],
[7, 9, 21],
[3,11,2]]
console.log("The original matrix is: " + a);
var matrixt = function(a) {
    for(var i=0; i<3;i++) {
        for(var j=0; j<i;j++){
            var temp = a[i][j];
            a[i][j] = a[j][i];
            a[j][i] = temp;
        }
    }
}

console.log("The transpose of the given matrix is: " + a);

matrixt(a);
console.log("The transpose of the given matrix is: " + a);

