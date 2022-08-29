// function temp (T:string, HookId: string) {  //advanced decorator
//     return function(constructor: any) {
//         const HeadingEl = document.getElementById(HookId);
//         const p = new constructor();
//         if(HeadingEl) {
//             HeadingEl.innerHTML = T;
//             HeadingEl.querySelector('h1')!.textContent = p.name;
//         } 
//     }
// }
// @temp('<h1>Building Decorators</h1>', 'heading')
// class pers {
//     name = 'Lilly the gourmand';

//     constructor() {
//         console.log('On process..');
//     }
// }
// const pr = new pers();
// console.log(pr);

// ---

function rec(target: any, propertyName: string | symbol) { //adding decorator to a property
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function rec2(target:any, name: string, descriptor: PropertyDescriptor) { //adding decorator to a accessor
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function rec3(target:any, name: string | symbol, descriptor: PropertyDescriptor) { //adding decorator to a method
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function rec4(target:string, name: string | symbol, position: number) { //adding decorator to a parameter
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);    
}
class test {
    @rec
    title: string;
    private price: number;
    @rec2
    set pr(val:number) {
        if (val >0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid Price')
        }
    }

    constructor(t:string, p:number) {
        this.title = t;
        this.price = p
    }

    @rec3 
    getPTax(@rec4 tax:number) {
        return this.price * (1 + tax); 
    }
}