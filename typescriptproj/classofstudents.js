var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Teacher = /** @class */ (function () {
    function Teacher(Tname, TidCard, TSno) {
        this.Tname = Tname;
        this.TiDCard = TidCard;
        this.TSno = TSno;
    }
    return Teacher;
}());
var Teach1 = new Teacher('Hema', '2022T056', 5);
console.log(Teach1);
var Students = /** @class */ (function (_super) {
    __extends(Students, _super);
    function Students(Sname, SiDcard, Sgrade, Ssection, Smarks) {
        var _this = _super.call(this, 'Hema', '2022T056', 5) || this;
        _this.Sname = Sname;
        _this.SiDCard = SiDcard;
        _this.Sgrade = Sgrade;
        _this.Ssection = Ssection;
        _this.Smarks = Smarks;
        return _this;
    }
    return Students;
}(Teacher));
var S1 = new Students('Rahul', '2022S021', 8, 'B', [67, 85, 77, 79, 90]);
var S2 = new Students('Lilly', '2022S016', 8, 'B', [95, 88, 84, 76, 73]);
var S3 = new Students('Julie', '2022S032', 8, 'B', [87, 56, 64, 78, 70]);
var S4 = new Students('Kevin', '2022S023', 8, 'B', [63, 65, 74, 80, 83]);
var S5 = new Students('Nate', '2022S030', 8, 'B', [78, 68, 81, 59, 90]);
console.log(S1, S2, S3, S4, S5);
var marks = [S1.Smarks, S2.Smarks, S3.Smarks, S4.Smarks, S5.Smarks];
console.log(marks);
for (var i = 0; i < 5; i++) {
    var s = 0;
    for (var j = 0; j < 5; j++) {
        s += marks[i][j];
    }
    console.log(s / 5);
}
