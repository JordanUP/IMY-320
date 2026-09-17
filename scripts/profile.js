import { COURSES } from "./data.js";
import { ensureDefaults, isLoggedIn, getName, getPurchasedIds } from "./storage.js";

ensureDefaults();

const profileName = document.getElementById("profileName");
const accountState = document.getElementById("accountState");
const listEl = document.getElementById("catList");

if (profileName) profileName.textContent = getName();

if (accountState) {
    accountState.textContent = isLoggedIn() ? "Learner" : "Not signed in";
}

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
        <span class="cat-row-go">Continue</span>
    `;
    return row;
}

function renderEmpty() {
    const empty = document.createElement("div");
    empty.className = "cat-empty";

    const heading = document.createElement("h2");
    heading.textContent = "Nothing on the easel yet";

    const copy = document.createElement("p");
    copy.textContent = "Pick a course and the first thing you finish will show up here.";

    const cta = document.createElement("a");
    cta.className = "btn btn-primary";
    cta.href = "catalogue.html";
    cta.textContent = "Browse courses";

    empty.append(heading, copy, cta);
    return empty;
}

function render() {
    if (!listEl) return;

    const owned = getPurchasedIds();
    const myCourses = COURSES.filter(course => owned.includes(course.cat));

    listEl.replaceChildren();

    if (myCourses.length === 0) {
        listEl.appendChild(renderEmpty());
        listEl.hidden = false;
        return;
    }

    myCourses.forEach(course => listEl.appendChild(renderRow(course)));
    listEl.hidden = false;
}

render();