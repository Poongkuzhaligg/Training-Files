"use strict";
class Teacher {
    Tname;
    TiDCard;
    TSno;
    constructor(Tname, TidCard, TSno) {
        this.Tname = Tname;
        this.TiDCard = TidCard;
        this.TSno = TSno;
    }
}
let Teach1 = new Teacher('Hema', '2022T056', 5);
console.log(Teach1);
class Students extends Teacher {
    Sname;
    SiDCard;
    Sgrade;
    Ssection;
    Smarks;
    Ssports;
    STrport;
    constructor(Sname, SiDcard, Sgrade, Ssection, Smarks, Ssports, STrport) {
        super('Hema', '2022T056', 5);
        this.Sname = Sname;
        this.SiDCard = SiDcard;
        this.Sgrade = Sgrade;
        this.Ssection = Ssection;
        this.Smarks = Smarks;
        this.Ssports = Ssports;
        this.STrport = STrport;
    }
}
let S1 = new Students('Rahul', '2022S021', 8, 'B', [67, 85, 77, 79, 90], ['Football', 'Running'], 'School Bus');
let S2 = new Students('Lilly', '2022S016', 8, 'B', [95, 88, 84, 76, 73], ['Kho-Kho', 'Badminton'], 'Cycle');
let S3 = new Students('Julie', '2022S032', 8, 'B', [87, 56, 64, 78, 70], ['Basketball', 'Throwball'], 'School bus');
let S4 = new Students('Kevin', '2022S023', 8, 'B', [63, 65, 74, 80, 83], ['Swimming', 'Volleyball'], 'Cycle');
let S5 = new Students('Nate', '2022S030', 8, 'B', [78, 68, 81, 59, 90], ['Cricket', 'Relay'], 'School Bus');
console.log(S1, S2, S3, S4, S5);
let marks = [S1.Smarks, S2.Smarks, S3.Smarks, S4.Smarks, S5.Smarks];
console.log(marks);
for (let i = 0; i < 5; i++) {
    var s = 0;
    for (let j = 0; j < 5; j++) {
        s += marks[i][j];
    }
    console.log(s / 5);
}
// class School extends Teacher {
//     totstud: number;
// }
//# sourceMappingURL=classofstudents.js.map