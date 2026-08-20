const profileName = document.getElementById("profileName");
const accountState = document.getElementById("accountState");

profileName.innerText = sessionStorage.name;

import { COURSES } from "./data.js";
const listEl = document.getElementById("catList");

function renderRow(course) {
    const row = document.createElement("a");
    row.className = "cat-row";
    row.setAttribute("role", "listitem");
    row.href = `courses.html?cat=${encodeURIComponent(course.cat)}`;

    row.innerHTML = `
        <span class="cat-row-mark" data-category="${course.category}"></span>
        <span class="cat-row-main">
            <span class="cat-row-title">${course.title}</span>
            <span class="cat-row-desc">${course.description}</span>
        </span>
        <span class="cat-row-meta">
            <span class="cat-tag">${course.category}</span>
            <span class="cat-instructor">by ${course.instructor}</span>
        </span>
        <span class="cat-row-stats">
            <span class="cat-rating">${course.rating.toFixed(1)} ★</span>
            <span class="cat-duration">${course.durationHours}h</span>
            <span class="cat-level">${course.level}</span>
        </span>
        <span class="cat-row-go">View course →</span>
    `;
    return row;
}

function render() {
    listEl.innerHTML = "";
    COURSES.forEach(course => listEl.appendChild(renderRow(course)));
    listEl.hidden = results.length === 0;
}

render();