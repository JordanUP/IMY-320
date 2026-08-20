const logoutButton = document.getElementById("clearAllButton");
import data from "../data/loginState.json" with { type: "json" };

if (logoutButton) {

    logoutButton.addEventListener("click", function() {
        sessionStorage.logged = data.logged;
        sessionStorage.name = data.name;
    });

    console.log(sessionStorage);
}