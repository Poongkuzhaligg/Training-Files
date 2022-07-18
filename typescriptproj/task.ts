class School {
    idcard: string;
    Tname: string;
    gender: string;
    private subhand: string;
    constructor(idcard: string, Tname: string, gender:string, subhand:string ) {
        this.idcard = idcard;
        this.Tname = Tname;
        this.gender = gender;
        this.subhand = subhand;
    }
}

const teach1 = new School('2018T067', 'Carol Smith','Female', 'English');
const teach2 = new School('2018T068', ' Smith','Male', 'Tamil');
const ar = [teach1,teach2];

console.log(ar);

class Class1 extends School {
    Sname:string[];
    grade: string;
    section: string;
    constructor(Sname:string[], grade:string, section:string){
        super('2018T067', 'Carol Smith','Female', 'English')
        this.Sname = Sname;
        this.grade = grade;
        this.section = section;
    }

}

const stud1 = new Class1(['Denis', 'Harry', 'Jenny'], '10', 'A');
console.log(stud1);

class Class2 extends School {
    Sname:string[];
    grade: string;
    section: string;
    constructor(Sname:string[], grade:string, section:string){
        super('2018T068', ' Smith','Male', 'Tamil')
        this.Sname = Sname;
        this.grade = grade;
        this.section = section;
    }

}

const stud2 = new Class2(['Gita', 'Peter', 'Reena'], '10', 'B');
console.log(stud2);
