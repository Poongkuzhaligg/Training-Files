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

type combinable = number | string;
function add(x: combinable, y: combinable) { //union types
    let result;
    if(typeof x === 'number' && typeof y === 'number') {
        result = x+y;
    }
    else {
        result = x.toString() + y.toString();
    }
    return result;

}

const addname = add('Jef',' Sadman');
console.log(addname);
const addage = add(34, 47);
console.log(addage);

