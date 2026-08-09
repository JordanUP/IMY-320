const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        sessionStorage.logged = false;

        // Login successful
        window.location.href = "index.html";
    });
}