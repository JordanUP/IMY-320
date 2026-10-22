/*
    Runs on every page. Swaps the right-hand side of the nav between
    "Log in / Sign up" and "name / Profile", and shows the "My Courses" link
    only when someone is logged in.
*/

import { ensureDefaults, isLoggedIn, getName } from "./storage.js";

ensureDefaults();

const logHeader = document.getElementById("logSect");
const myCoursesItem = document.getElementById("navMyCourses");

const loggedIn = isLoggedIn();

if (myCoursesItem) myCoursesItem.hidden = !loggedIn;

if (logHeader) {
    if (loggedIn) {
        const label = document.createElement("p");
        label.className = "profile";
        label.textContent = getName();

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