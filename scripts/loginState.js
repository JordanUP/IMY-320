const logHeader = document.getElementById("logSect");

import data from "../data/loginState.json" with { type: "json" };

if (sessionStorage.length == 1 || sessionStorage.length == 0) {
    sessionStorage.logged = data.logged;
    sessionStorage.name = data.name;
}

console.log(sessionStorage);

if (sessionStorage.logged == "true") {
    logHeader.innerHTML = '<p class="profile">' + sessionStorage.name + '</p> <a href="profile.html" class="btn btn-primary">Profile</a>'
}
else {
    logHeader.innerHTML = '<a href="login.html" class="btn btn-ghost">Log in</a> <a href="signup.html" class="btn btn-primary">Sign up</a>'
}