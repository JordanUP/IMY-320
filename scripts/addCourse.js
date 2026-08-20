const logoutButton = document.getElementById("buyButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        const params = new URLSearchParams(window.location.search);
        let id = params.get("cat");

        var classes = [];

        if (sessionStorage.courses = "") {
            classes = [id];
        }
        else {
            classes = [sessionStorage.courses];
            classes.push(id);
        }

        sessionStorage.courses = classes;

        console.log(sessionStorage);
    });
}