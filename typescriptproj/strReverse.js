var str;
var rstr = '';
function revstr(str) {
    for (var i = str.length - 1; i >= 0; i--) {
        rstr = rstr + str[i];
    }
    console.log(rstr);
    if (str == rstr) {
        console.log("It is a Palindrome");
    }
    else {
        console.log("Not a Palindrome");
    }
}
revstr("545458");
