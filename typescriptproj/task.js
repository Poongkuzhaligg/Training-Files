class School {
    constructor(idcard, Tname, gender, subhand) {
        this.idcard = idcard;
        this.Tname = Tname;
        this.gender = gender;
        this.subhand = subhand;
    }
}
const teach1 = new School('2018T067', 'Carol Smith', 'Female', 'English');
const teach2 = new School('2018T068', ' Smith', 'Male', 'Tamil');
const ar = [teach1, teach2];
console.log(ar);
class Class1 extends School {
    constructor(Sname, grade, section) {
        super('2018T067', 'Carol Smith', 'Female', 'English');
        this.Sname = Sname;
        this.grade = grade;
        this.section = section;
    }
}
const stud1 = new Class1(['Denis', 'Harry', 'Jenny'], '10', 'A');
console.log(stud1);
class Class2 extends School {
    constructor(Sname, grade, section) {
        super('2018T068', ' Smith', 'Male', 'Tamil');
        this.Sname = Sname;
        this.grade = grade;
        this.section = section;
    }
    get sub() {
        return this.section;
    }
    set sub(x) {
        this.section = x;
    }
    static subject1(p) {
        console.log("Fav subject English", p.age, p.name);
    }
}
Class2.subject = 'Math';
class employee {
    // name: string;
    // age: number;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    print() {
        console.log(this.name);
    }
}
const x = new employee('Lily', 15);
x.print();
const stud2 = new Class2(['Gita', 'Peter', 'Reena'], '10', 'B');
console.log(stud2.Sname);
console.log(Class2.subject);
console.log(stud2.sub);
stud2.sub = 'Tamil';
console.log(stud2);
// Class2.subject1({name:'Pooja', age:12});
