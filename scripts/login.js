console.log("hello there");

const signupButton = document.getElementById("signupButton");

if (signupButton) {

    signupButton.addEventListener("click", function() {
        console.log("working1");

        const username = document.getElementById("signupusername").value.trim();
        const password = document.getElementById("signuppassword").value;

        const usernameError = document.getElementById("signupusernameError");
        const passwordError = document.getElementById("signuppasswordError");

        // Clear old error messages
        usernameError.textContent = "";
        passwordError.textContent = "";

        let valid = true;

        // Check username
        if (username === "") {
            usernameError.textContent = "Please enter a username.";
            valid = false;
        }

        // Check password
        if (password === "") {
            passwordError.textContent = "Please enter a password.";
            valid = false;
        } else if (password.length < 6) {
            passwordError.textContent =
                "Password must be at least 6 characters long.";
            valid = false;
        }

        // Stop if there are errors
        if (!valid) {
            return;
        }

        // Signup successful
        window.location.href = "index.html";
    });
}

const loginButton = document.getElementById("loginButton");

if (loginButton) {

    loginButton.addEventListener("click", function() {
        console.log("working2");

        const username = document.getElementById("loginusername").value.trim();
        const password = document.getElementById("loginpassword").value;

        const usernameError = document.getElementById("loginusernameError");
        const passwordError = document.getElementById("loginpasswordError");

        // Clear old error messages
        usernameError.textContent = "";
        passwordError.textContent = "";

        let valid = true;

        // Check username
        if (username === "") {
            usernameError.textContent = "Please enter your username.";
            valid = false;
        }

        // Check password
        if (password === "") {
            passwordError.textContent = "Please enter your password.";
            valid = false;
        }

        // Stop if there are errors
        if (!valid) {
            return;
        }

        // Login successful
        window.location.href = "index.html";
    });
}