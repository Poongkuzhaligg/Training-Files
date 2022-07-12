    function validateform() {
        let x = document.forms["form"]["fname"].value;
        if (x == "") {
            alert("Form must be filled out");
            return false;
        }

        let y = document.forms["form"]["lname"].value;
        if (y == "") {
            alert("Form must be filled out");
            return false;
        }

        let z = document.forms["form"]["age"]["gender"].value;
        if (z == "") {
            alert("Form must be filled out");
            return false;
        }

        // let k = document.forms["form"]["email"].value;
        // if (z != "@" && z=="") {
        //     alert("Email ID Incorrect!");
        //     return false;
        }
}
