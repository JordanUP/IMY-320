/*
    Log in and sign up. Both pages load this file; each form only wires up if its
    button exists on the page.

    Sign up checks (shown on the page, beside each field):
    username  3 to 20 characters, letters, numbers or underscore only, not already taken
    email     looks like an email, not already used
    password  8+ characters, at least one number and one special character
    confirm   matches the password
    A live checklist under the password ticks off rules as they are met.

    Log in verifies against the accounts made on sign up, offers "Remember me",
    and prefills the last username used on this device.
*/

import {
    login, getLastUser, createAccount, verifyAccount, accountExists, emailInUse
} from "./storage.js";

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

const passwordRules = [
    { id: "length", test: pw => pw.length >= MIN_PASSWORD_LENGTH },
    { id: "number", test: pw => /\d/.test(pw) },
    { id: "special", test: pw => /[^A-Za-z0-9]/.test(pw) }
];


function setError(field, message) {
    const errorEl = document.getElementById(`${field}Error`);
    const inputEl = document.getElementById(field);

    if (errorEl) errorEl.textContent = message;
    if (inputEl) {
        inputEl.classList.toggle("has-error", Boolean(message));
        inputEl.setAttribute("aria-invalid", message ? "true" : "false");
    }
}

function setFormError(prefix, message) {
    const el = document.getElementById(`${prefix}FormError`);
    if (el) el.textContent = message;
}


document.querySelectorAll(".pw-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        if (!input) return;

        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        button.textContent = showing ? "Show" : "Hide";
        button.setAttribute("aria-pressed", String(!showing));
    });
});

function onEnter(elements, submit) {
    elements.forEach(el => {
        el.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                submit();
            }
        });
    });
}

//Sign up
function validateSignupUsername(value) {
    if (value === "") return "Choose a username.";
    if (!USERNAME_PATTERN.test(value)) {
        return "Use 3 to 20 letters, numbers or underscores. No spaces or other symbols.";
    }
    if (accountExists(value)) return "That username is taken. Try another.";
    return "";
}

function validateEmail(value) {
    if (value === "") return "Enter your email address.";
    if (!EMAIL_PATTERN.test(value)) return "That doesn't look like an email, e.g. name@example.com.";
    if (emailInUse(value)) return "An account with that email already exists.";
    return "";
}

function validateSignupPassword(value) {
    if (value === "") return "Create a password.";
    const missing = passwordRules.filter(rule => !rule.test(value));
    if (missing.length > 0) return "Your password doesn't meet all the rules below yet.";
    return "";
}

function validateConfirm(password, confirm) {
    if (confirm === "") return "Type your password again.";
    if (confirm !== password) return "The passwords don't match.";
    return "";
}

function updatePasswordRules(value) {
    passwordRules.forEach(rule => {
        const item = document.querySelector(`[data-rule="${rule.id}"]`);
        if (item) item.classList.toggle("is-met", rule.test(value));
    });
}

function wireSignup() {
    const button = document.getElementById("signupButton");
    if (!button) return;

    const usernameEl = document.getElementById("signupusername");
    const emailEl = document.getElementById("signupemail");
    const passwordEl = document.getElementById("signuppassword");
    const confirmEl = document.getElementById("signupconfirm");

    const checks = {
        signupusername: () => validateSignupUsername(usernameEl.value.trim()),
        signupemail: () => validateEmail(emailEl.value.trim()),
        signuppassword: () => validateSignupPassword(passwordEl.value),
        signupconfirm: () => validateConfirm(passwordEl.value, confirmEl.value)
    };

    // Check a field when the user leaves it, but only once they typed something.
    [usernameEl, emailEl, passwordEl, confirmEl].forEach(el => {
        el.addEventListener("blur", () => {
            if (el.value !== "") setError(el.id, checks[el.id]());
        });
        el.addEventListener("input", () => {
            setError(el.id, "");
            setFormError("signup", "");
        });
    });

    passwordEl.addEventListener("input", () => {
        updatePasswordRules(passwordEl.value);
        // If they already filled the confirm box, keep its match message honest.
        if (confirmEl.value !== "") setError("signupconfirm", checks.signupconfirm());
    });

    async function submit() {
        const errors = {};
        Object.entries(checks).forEach(([field, check]) => {
            errors[field] = check();
            setError(field, errors[field]);
        });

        const firstBad = Object.keys(errors).find(field => errors[field] !== "");
        if (firstBad) {
            document.getElementById(firstBad).focus();
            return;
        }

        button.disabled = true;
        button.value = "Signing up…";

        const username = usernameEl.value.trim();
        await createAccount({ username, email: emailEl.value.trim(), password: passwordEl.value });
        login(username, false);
        window.location.href = "catalogue.html";
    }

    onEnter([usernameEl, emailEl, passwordEl, confirmEl], submit);
    button.addEventListener("click", submit);
}

//Log in
function wireLogin() {
    const button = document.getElementById("loginButton");
    if (!button) return;

    const usernameEl = document.getElementById("loginusername");
    const passwordEl = document.getElementById("loginpassword");
    const rememberEl = document.getElementById("loginremember");

    const last = getLastUser();
    if (last) {
        usernameEl.value = last;
        passwordEl.focus();
    }

    [usernameEl, passwordEl].forEach(el => {
        el.addEventListener("input", () => {
            setError(el.id, "");
            setFormError("login", "");
        });
    });

    async function submit() {
        const username = usernameEl.value.trim();
        const password = passwordEl.value;

        setError("loginusername", username === "" ? "Enter your username." : "");
        setError("loginpassword", password === "" ? "Enter your password." : "");

        if (username === "" || password === "") {
            (username === "" ? usernameEl : passwordEl).focus();
            return;
        }

        button.disabled = true;
        button.value = "Logging in…";

        const account = await verifyAccount(username, password);

        if (!account) {
            button.disabled = false;
            button.value = "Log In";
            setFormError("login", "That username and password don't match. Check them, or create an account.");
            passwordEl.focus();
            return;
        }

        login(account.username, rememberEl.checked);
        window.location.href = "index.html";
    }

    onEnter([usernameEl, passwordEl], submit);
    button.addEventListener("click", submit);
}

wireSignup();
wireLogin();