
function loading(){
    const request = new XMLHttpRequest();
    request.onload = function(){
        // console.log(this.responseText);
        document.getElementById("demo23").innerHTML = this.responseText;
    }
    request.open("GET","url.txt");
    request.send();
}
loading();
