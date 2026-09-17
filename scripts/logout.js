import { logout } from "./storage.js";

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        logout();
        window.location.href = "index.html";
    });
}