var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function temp(T, HookId) {
    return function (constructor) {
        var HeadingEl = document.getElementById(HookId);
        var p = new constructor();
        if (HeadingEl) {
            HeadingEl.innerHTML = T;
            HeadingEl.querySelector('h1').textContent = p.name;
        }
    };
}
var pers = /** @class */ (function () {
    function pers() {
        this.name = ['Lilly the gourmand'];
        console.log('On process..');
    }
    pers = __decorate([
        temp('<h1>Building Decorators</h1>', 'heading')
    ], pers);
    return pers;
}());
var pr = new pers();
console.log(pr);
