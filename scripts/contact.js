/*
    valid message shows a confirmation on the page instead of sending anywhere.
*/

const form = document.getElementById("contactForm");

if (form) {
    const nameEl = document.getElementById("contactName");
    const emailEl = document.getElementById("contactEmail");
    const messageEl = document.getElementById("contactMessage");
    const errorEl = document.getElementById("contactError");
    const thanksEl = document.getElementById("contactThanks");

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener("submit", event => {
        event.preventDefault();
        thanksEl.hidden = true;

        let problem = "";
        let target = null;

        if (nameEl.value.trim() === "") {
            problem = "Tell us your name.";
            target = nameEl;
        } else if (!EMAIL_PATTERN.test(emailEl.value.trim())) {
            problem = "Enter an email address we can reply to.";
            target = emailEl;
        } else if (messageEl.value.trim().length < 10) {
            problem = "Add a little more detail to your message.";
            target = messageEl;
        }

        errorEl.textContent = problem;

        if (problem) {
            target.focus();
            return;
        }

        form.reset();
        thanksEl.hidden = false;
    });

    [nameEl, emailEl, messageEl].forEach(el =>
        el.addEventListener("input", () => { errorEl.textContent = ""; })
    );
}
