/*
    Confetti celebration
*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function scatterFlecks(container, count = 32) {
    if (prefersReducedMotion) return;

    const layer = document.createElement("div");
    layer.className = "enrol-flecks";
    layer.setAttribute("aria-hidden", "true");

    for (let i = 0; i < count; i++) {
        const fleck = document.createElement("span");
        fleck.className = "enrol-fleck";
        fleck.style.setProperty("--x", `${Math.random() * 100}%`);
        fleck.style.setProperty("--drift", `${(Math.random() - 0.5) * 140}px`);
        fleck.style.setProperty("--spin", `${Math.random() * 540 - 270}deg`);
        fleck.style.setProperty("--delay", `${Math.random() * 600}ms`);
        fleck.style.setProperty("--scale", (0.6 + Math.random() * 0.8).toFixed(2));
        layer.appendChild(fleck);
    }

    container.appendChild(layer);
    window.setTimeout(() => layer.remove(), 4200);
}
