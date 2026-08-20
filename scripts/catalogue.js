import { COURSES } from "./data.js";

const listEl = document.getElementById("catList");
const emptyEl = document.getElementById("catEmpty");
const countEl = document.getElementById("catCount");
const searchEl = document.getElementById("catSearch");
const categoryEl = document.getElementById("catCategory");
const sortEl = document.getElementById("catSort");
const resetBtn = document.getElementById("catReset");

function populateCategories() {
    const categories = [...new Set(COURSES.map(c => c.category))].sort();
    for (const category of categories) {
        const opt = document.createElement("option");
        opt.value = category;
        opt.textContent = category;
        categoryEl.appendChild(opt);
    }
}

function matchesSearch(course, query) {
    if (!query) return true;
    const haystack = `${course.title} ${course.instructor} ${course.category}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
}

function sortCourses(courses, sortKey) {
    const sorted = [...courses];
    switch (sortKey) {
        case "rating-desc":
            return sorted.sort((a, b) => b.rating - a.rating);
        case "rating-asc":
            return sorted.sort((a, b) => a.rating - b.rating);
        case "title-asc":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case "title-desc":
            return sorted.sort((a, b) => b.title.localeCompare(a.title));
        case "duration-asc":
            return sorted.sort((a, b) => a.durationHours - b.durationHours);
        case "duration-desc":
            return sorted.sort((a, b) => b.durationHours - a.durationHours);
        default:
            return sorted;
    }
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
        <span class="cat-row-go">View course →</span>
    `;
    return row;
}

function render() {
    const query = searchEl.value.trim();
    const category = categoryEl.value;
    const sortKey = sortEl.value;

    let results = COURSES.filter(c => matchesSearch(c, query));
    if (category !== "all") {
        results = results.filter(c => c.category === category);
    }
    results = sortCourses(results, sortKey);

    listEl.innerHTML = "";
    results.forEach(course => listEl.appendChild(renderRow(course)));

    const showingAll = results.length === COURSES.length;
    countEl.textContent = showingAll
        ? `${COURSES.length} courses`
        : `${results.length} of ${COURSES.length} courses`;

    emptyEl.hidden = results.length !== 0;
    listEl.hidden = results.length === 0;
}

searchEl.addEventListener("input", render);
categoryEl.addEventListener("change", render);
sortEl.addEventListener("change", render);
resetBtn.addEventListener("click", () => {
    searchEl.value = "";
    categoryEl.value = "all";
    sortEl.value = "relevance";
    render();
});

populateCategories();
render();