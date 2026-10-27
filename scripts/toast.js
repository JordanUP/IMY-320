/*  
    A small, non-blocking notification that slides in from the bottom-right and disappears on its own.
*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function showToast({ title, message, duration = 6000 }) {
    // Only ever show one at a time
    document.querySelectorAll(".bs-toast").forEach(t => t.remove());

    const toast = document.createElement("div");
    toast.className = "bs-toast";
    toast.setAttribute("role", "status"); 
    toast.setAttribute("aria-live", "polite");

    const heading = document.createElement("p");
    heading.className = "bs-toast-title";
    heading.textContent = title;
    toast.appendChild(heading);

    if (message) {
        const copy = document.createElement("p");
        copy.className = "bs-toast-message";
        copy.textContent = message;
        toast.appendChild(copy);
    }

    const close = document.createElement("button");
    close.type = "button";
    close.className = "bs-toast-close";
    close.setAttribute("aria-label", "Dismiss notification");
    close.textContent = "×";
    close.addEventListener("click", dismiss);
    toast.appendChild(close);

    document.body.appendChild(toast);

    // Add the visible class on the next frame so the transition actually runs
    if (prefersReducedMotion) {
        toast.classList.add("is-visible");
    } else {
        requestAnimationFrame(() => toast.classList.add("is-visible"));
    }

    let hideTimer = null;
    let removeTimer = null;

    function dismiss() {
        window.clearTimeout(hideTimer);
        window.clearTimeout(removeTimer);
        toast.classList.remove("is-visible");

        if (prefersReducedMotion) {
            toast.remove();
        } else {
            // Wait for the slide-out before removing from the DOM
            removeTimer = window.setTimeout(() => toast.remove(), 260);
        }
    }

    hideTimer = window.setTimeout(dismiss, duration);

    return dismiss;
}