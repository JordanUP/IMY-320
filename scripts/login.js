import { login } from "./storage.js";

const MIN_PASSWORD_LENGTH = 8;

function setError(field, message) {
    const errorEl = document.getElementById(`${field}Error`);
    const inputEl = document.getElementById(field);

    if (errorEl) errorEl.textContent = message;
    if (inputEl) {
        inputEl.classList.toggle("has-error", Boolean(message));
        inputEl.setAttribute("aria-invalid", message ? "true" : "false");
    }
}

function validateUsername(field, value) {
    if (value === "") {
        setError(field, "Enter a username.");
        return false;
    }
    setError(field, "");
    return true;
}

function validatePassword(field, value, { checkLength }) {
    if (value === "") {
        setError(field, "Enter a password.");
        return false;
    }
    if (checkLength && value.length < MIN_PASSWORD_LENGTH) {
        setError(field, `Use at least ${MIN_PASSWORD_LENGTH} characters.`);
        return false;
    }
    setError(field, "");
    return true;
}

function wireForm(prefix, { checkPasswordLength }) {
    const button = document.getElementById(`${prefix}Button`);
    if (!button) return;

    const usernameField = `${prefix}username`;
    const passwordField = `${prefix}password`;

    const usernameEl = document.getElementById(usernameField);
    const passwordEl = document.getElementById(passwordField);

    function submit() {
        const username = usernameEl.value.trim();
        const password = passwordEl.value;

        const usernameOk = validateUsername(usernameField, username);
        const passwordOk = validatePassword(passwordField, password, {
            checkLength: checkPasswordLength
        });

        if (!usernameOk || !passwordOk) {
            //focus the first thing that needs fixing
            (usernameOk ? passwordEl : usernameEl).focus();
            return;
        }

        login(username);
        window.location.href = "index.html";
    }

    usernameEl.addEventListener("blur", () => {
        if (usernameEl.value.trim() !== "") {
            validateUsername(usernameField, usernameEl.value.trim());
        }
    });

    passwordEl.addEventListener("blur", () => {
        if (passwordEl.value !== "") {
            validatePassword(passwordField, passwordEl.value, {
                checkLength: checkPasswordLength
            });
        }
    });

    usernameEl.addEventListener("input", () => setError(usernameField, ""));
    passwordEl.addEventListener("input", () => setError(passwordField, ""));

    [usernameEl, passwordEl].forEach(el => {
        el.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                submit();
            }
        });
    });

    button.addEventListener("click", submit);
}

wireForm("signup", { checkPasswordLength: true });
wireForm("login", { checkPasswordLength: false });