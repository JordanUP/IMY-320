import { COURSES } from "./data.js";
import { isLoggedIn, hasPurchased, addPurchase } from "./storage.js";

const buyButton = document.getElementById("buyButton");

const params = new URLSearchParams(window.location.search);
const courseId = params.get("cat");
const course = courseId ? COURSES.find(c => c.cat === courseId) : null;

const SETTLE_MS = 700;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lastFocused = null;

//confirmation
function scatterFlecks(panel) {
    if (prefersReducedMotion) return;

    const layer = document.createElement("div");
    layer.className = "enrol-flecks";
    layer.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 28; i++) {
        const fleck = document.createElement("span");
        fleck.className = "enrol-fleck";
        fleck.style.setProperty("--x", `${Math.random() * 100}%`);
        fleck.style.setProperty("--drift", `${(Math.random() - 0.5) * 140}px`);
        fleck.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
        fleck.style.setProperty("--delay", `${Math.random() * 220}ms`);
        fleck.style.setProperty("--scale", (0.6 + Math.random() * 0.8).toFixed(2));
        layer.appendChild(fleck);
    }

    panel.appendChild(layer);
    window.setTimeout(() => layer.remove(), 2600);
}

function buildDialog({ title, body, actions }) {
    const overlay = document.createElement("div");
    overlay.className = "enrol-overlay";

    const panel = document.createElement("div");
    panel.className = "enrol-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "enrolTitle");

    const heading = document.createElement("h2");
    heading.className = "enrol-title";
    heading.id = "enrolTitle";
    heading.textContent = title;

    const close = document.createElement("button");
    close.type = "button";
    close.className = "enrol-close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "\u00d7";

    const actionRow = document.createElement("div");
    actionRow.className = "enrol-actions";

    actions.forEach(action => {
        const el = document.createElement("a");
        el.className = `btn ${action.variant}`;
        el.href = action.href;
        el.textContent = action.label;
        actionRow.appendChild(el);
    });

    panel.append(close, heading, ...body, actionRow);
    overlay.appendChild(panel);

    return { overlay, panel, close };
}

function openDialog(config, { celebrateOnOpen = false } = {}) {
    lastFocused = document.activeElement;

    const { overlay, panel, close } = buildDialog(config);
    document.body.appendChild(overlay);
    document.body.classList.add("enrol-locked");

    requestAnimationFrame(() => overlay.classList.add("is-open"));

    if (celebrateOnOpen) scatterFlecks(panel);

    const focusable = () =>
        panel.querySelectorAll("a[href], button:not([disabled])");

    function dismiss() {
        overlay.classList.remove("is-open");
        document.body.classList.remove("enrol-locked");
        document.removeEventListener("keydown", onKeydown);

        window.setTimeout(() => {
            overlay.remove();
            if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
        }, prefersReducedMotion ? 0 : 200);
    }

    function onKeydown(event) {
        if (event.key === "Escape") {
            dismiss();
            return;
        }

        if (event.key === "Tab") {
            const items = focusable();
            if (items.length === 0) return;

            const first = items[0];
            const last = items[items.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }

    close.addEventListener("click", dismiss);
    overlay.addEventListener("click", event => {
        if (event.target === overlay) dismiss();
    });
    document.addEventListener("keydown", onKeydown);

    const primary = panel.querySelector(".btn-primary") || close;
    primary.focus();
}

//content
function paragraph(text, className) {
    const p = document.createElement("p");
    p.className = className;
    p.textContent = text;
    return p;
}

function showEnrolled(enrolledCourse) {
    const body = [
        paragraph(enrolledCourse.title, "enrol-course")
    ];

    if (enrolledCourse.finishedPiece) {
        const label = paragraph("What you'll finish", "enrol-label");
        const piece = paragraph(enrolledCourse.finishedPiece, "enrol-piece");
        body.push(label, piece);
    }

    openDialog({
        title: "You're enrolled",
        body,
        actions: [
            { label: "Start course", href: "profile.html", variant: "btn-primary" },
            { label: "Keep browsing", href: "catalogue.html", variant: "btn-ghost" }
        ]
    }, { celebrateOnOpen: true });
}

function showLoginPrompt() {
    openDialog({
        title: "Log in to enrol",
        body: [
            paragraph(
                "Courses are saved to your account so you can pick up where you left off.",
                "enrol-piece"
            )
        ],
        actions: [
            { label: "Log in", href: "login.html", variant: "btn-primary" },
            { label: "Create an account", href: "signup.html", variant: "btn-ghost" }
        ]
    });
}

//button states
function setOwnedState() {
    buyButton.value = "Go to your courses";
    buyButton.classList.add("is-owned");
}

if (buyButton && course) {

    if (hasPurchased(course.cat)) setOwnedState();

    buyButton.addEventListener("click", function () {

        if (buyButton.classList.contains("is-owned")) {
            window.location.href = "profile.html";
            return;
        }

        if (!isLoggedIn()) {
            showLoginPrompt();
            return;
        }

        buyButton.disabled = true;
        buyButton.value = "Enrolling…";
        buyButton.classList.add("is-working");

        window.setTimeout(() => {
            addPurchase(course.cat);

            buyButton.disabled = false;
            buyButton.classList.remove("is-working");
            setOwnedState();

            showEnrolled(course);
        }, prefersReducedMotion ? 0 : SETTLE_MS);
    });

} else if (buyButton) {
    /* No matching course in the URL. Do not offer an action that cannot work. */
    buyButton.disabled = true;
    buyButton.value = "Course unavailable";
}