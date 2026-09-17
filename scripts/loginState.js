import { ensureDefaults, isLoggedIn, getName } from "./storage.js";

ensureDefaults();

const logHeader = document.getElementById("logSect");

if (logHeader) {
    if (isLoggedIn()) {
        const name = getName();

        const label = document.createElement("p");
        label.className = "profile";
        label.textContent = name;

        const link = document.createElement("a");
        link.href = "profile.html";
        link.className = "btn btn-primary";
        link.textContent = "Profile";

        logHeader.replaceChildren(label, link);
    } else {
        const logIn = document.createElement("a");
        logIn.href = "login.html";
        logIn.className = "btn btn-ghost";
        logIn.textContent = "Log in";

        const signUp = document.createElement("a");
        signUp.href = "signup.html";
        signUp.className = "btn btn-primary";
        signUp.textContent = "Sign up";

        logHeader.replaceChildren(logIn, signUp);
    }
}