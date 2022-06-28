<script>

    function validateform() {
        let x = document.forms["form"]["fname"].value;
        if (x == "") {
            alert("Form must be filled out");
            return false;
        }

}
</script>