// let fetchRequest = fetch("https://jsonplaceholder.typicode.com/todos/1");
// fetchRequest.then(
//     response => response.json())
//     .then(
//         result => {console.log(result)})

//to run this fetch function we need to include the import statement
///import fetch from 'node-fetch';
async function fetchFunc(url) {
    const result = await fetch(url);
    //const varr = await fetchFunc();
    const varrResult = await result.text();
    // console.log(varrResult);
    document.getElementById("demo22").innerHTML = varrResult;
}
fetchFunc("https://jsonplaceholder.typicode.com/todos/1");
// console.log(varrResult);

// Get request using json placeholder api
async function createNewUser(file) {
    let createVariable = fetch(file, {
        method: 'POST',
        body: JSON.stringify({
            "name": "Perry",
            "username": "Perry_OG",
            "email": "perry@lmix.com",
            "address": {
                "street": "222 becker Street",
                "suite": "Apt. 556", "city": "Manchester",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
        }),
        headers: {
            'Content-type': 'application/json; charset = UTF-8'
        },
    })
        .then((response) => response.text())
        .then((user) => {
            document.getElementById("demo24").innerHTML = "Sucessfully New ID is created";

            getDetails()
            .then(() => updateUser().then(() => getDetails().then(() => deleteUser("https://jsonplaceholder.typicode.com/users/11")))
            )
        })
}


createNewUser("https://jsonplaceholder.typicode.com/users")
//Get request to see the result of post
async function getDetails() {

    const request = await fetch("https://jsonplaceholder.typicode.com/users");
    const displayText = await request.text();
    document.getElementById("para25").innerHTML = displayText;
}

async function updateUser(file) {
    let createVariable = fetch(file, {
        method: 'PUT',
        body: JSON.stringify({
            "id": 11,
            "name": "Perry Lane",
            "username": "Perry_OG",
            "email": "perry@lmix.com",
            "address": {
                "street": "222 becker Street",
                "suite": "Apt. 556", "city": "Manchester",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org"
        }),
        headers: {
            'Content-type': 'application/json; charset = UTF-8'
        },
    })
        .then((response) => response.text())
        .then((user) => {
            document.getElementById("demo26").innerHTML = "Sucessfully New ID is Updated" + JSON.stringify(user);
        })
    // .then((dataDisplay) => document.getElementById("demo26").innerHTML = dataDisplay)
}

//Get request to see the result of post
async function getDetails() {

    const request = await fetch("https://jsonplaceholder.typicode.com/users/11");
    const displayText = await request.text();
    document.getElementById("demo27").innerHTML = displayText;
}

async function deleteUser(file) {
    let createVariable = fetch(file, {
        method: 'DEL',
        headers: {
            'Content-type': 'application/json; charset = UTF-8'
        },
    })

        .then((response) => response.text())
        .then((user) => document.getElementById("demo28").innerHTML = "Sucessfully deleted the User")
}

