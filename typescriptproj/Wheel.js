
function onscroll() {
    console.log("hey");
}
    var Zimg = document.getElementById('wheelImg');
    // let x = Zimg.scrollWidth;
    // let y = Zimg.scrollHeight;
    // console.log(x, y);
    // console.log(window.scrollX, window.scrollY )
    // document.getElementById("check").innerHTML = window.scrollX;
    // // if(window.scrollX > 0){
    // //     Zimg.style.width = (x+10)+'%';;
    // //     Zimg.style.height = (y+10)+'%';
    // // }
    // // else{
    // //     Zimg.style.width = (x+10)+'%';
    // //     Zimg.style.height = (y+10)+'%';
    // // }

    Zimg.addEventListener("scroll", onscroll);


