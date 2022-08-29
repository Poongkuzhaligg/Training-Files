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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//     constructor() {
//         console.log('On process..');
//     }
// }
// const pr = new pers();
// console.log(pr);
// ---
function rec(target, propertyName) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}
function rec2(target, name, descriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function rec3(target, name, descriptor) {
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function rec4(target, name, position) {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
var test = /** @class */ (function () {
    function test(t, p) {
        this.title = t;
        this.price = p;
    }
    Object.defineProperty(test.prototype, "pr", {
        set: function (val) {
            if (val > 0) {
                this.price = val;
            }
            else {
                throw new Error('Invalid Price');
            }
        },
        enumerable: false,
        configurable: true
    });
    test.prototype.getPTax = function (tax) {
        return this.price * (1 + tax);
    };
    __decorate([
        rec
    ], test.prototype, "title");
    __decorate([
        rec2
    ], test.prototype, "pr");
    __decorate([
        rec3,
        __param(0, rec4)
    ], test.prototype, "getPTax");
    return test;
}());
