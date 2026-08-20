import { COURSES } from "./data.js";

const loadingEl = document.getElementById("courseLoading");
const notFoundEl = document.getElementById("courseNotFound");
const contentEl = document.getElementById("courseContent");

function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("cat");
}

function renderModules(modules) {
    const list = document.getElementById("courseModules");
    list.innerHTML = "";
    modules.forEach(module => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${module.title}</strong><span>${module.detail}</span>`;
        list.appendChild(li);
    });
}

function renderCourse(course) {
    document.title = `BrushStroke — ${course.title}`;

    document.getElementById("courseTag").textContent = course.category;
    document.getElementById("courseTitle").textContent = course.title;
    document.getElementById("courseSummary").textContent = course.summary;

    document.getElementById("courseRating").textContent = `${course.rating.toFixed(1)} ★`;
    document.getElementById("courseDuration").textContent = `${course.durationHours}h`;
    document.getElementById("courseLevel").textContent = course.level;
    document.getElementById("courseInstructor").textContent = course.instructor;

    document.getElementById("courseFinishedPiece").textContent = course.finishedPiece;
    renderModules(course.modules);

    document.getElementById("courseInstructorName").textContent = course.instructor;
    document.getElementById("courseInstructorBio").textContent = course.instructorBio;

    loadingEl.hidden = true;
    contentEl.hidden = false;
}

function showNotFound() {
    loadingEl.hidden = true;
    notFoundEl.hidden = false;
}

const category = getCategoryFromUrl();
const course = category ? COURSES.find(c => c.cat === category) : null;

if (course) {
    renderCourse(course);
} else {
    showNotFound();
}