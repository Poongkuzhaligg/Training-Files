function temp (T:string, HookId: string) {  //advanced decorator
    return function(constructor: any) {
        const HeadingEl = document.getElementById(HookId);
        const p = new constructor();
        if(HeadingEl) {
            HeadingEl.innerHTML = T;
            HeadingEl.querySelector('h1')!.textContent = p.name;
        } 
    }
}
@temp('<h1>Building Decorators</h1>', 'heading')
class pers {
    name = ['Lilly the gourmand'];

    constructor() {
        console.log('On process..');
    }
}
const pr = new pers();
console.log(pr);