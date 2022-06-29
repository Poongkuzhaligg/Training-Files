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

        let z = document.forms["form"]["age"].value;
        if (z == "") {
            alert("Form must be filled out");
            return false;
        }
}
