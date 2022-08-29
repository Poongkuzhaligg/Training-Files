
var str: string; 
var rstr = '';


function revstr(str : string) {
    for(let i=str.length-1; i >= 0; i-- ) {
        rstr = rstr + str[i];
    }
    console.log(rstr);

    if(str == rstr) {
        console.log("It is a Palindrome")
    }

    else {
        console.log("Not a Palindrome")
    }
    
}
revstr("545458");





