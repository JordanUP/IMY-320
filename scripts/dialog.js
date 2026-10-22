/*
    One accessible modal dialog for the whole site: focus is trapped, 
    Escape and the backdrop close it, and focus returns to whatever opened it.
*/

import { scatterFlecks } from "./flecks.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function paragraph(text, className) {
    const p = document.createElement("p");
    p.className = className;
    p.textContent = text;
    return p;
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

export function openDialog(config, { celebrate = false } = {}) {
    const lastFocused = document.activeElement;

    const { overlay, panel, close } = buildDialog(config);
    document.body.appendChild(overlay);
    document.body.classList.add("enrol-locked");

    requestAnimationFrame(() => overlay.classList.add("is-open"));

    if (celebrate) scatterFlecks(panel);

    const focusable = () => panel.querySelectorAll("a[href], button:not([disabled])");

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

    (panel.querySelector(".btn-primary") || close).focus();
}
