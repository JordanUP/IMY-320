/*
    The learner's profile: name, enrolled courses with real progress, and the
    certificates they have earned. Courses link straight into the next lesson.
*/

import { COURSES } from "./data.js";
import {
    ensureDefaults, isLoggedIn, getName, getPurchasedIds, getCertificates
} from "./storage.js";
import { getCourseProgress, getNextLessonIndex, lessonUrl } from "./lessons.js";

ensureDefaults();

const profileName = document.getElementById("profileName");
const accountState = document.getElementById("accountState");
const listEl = document.getElementById("catList");
const certListEl = document.getElementById("certList");

const loggedIn = isLoggedIn();

if (profileName) profileName.textContent = loggedIn ? getName() : "Not signed in";
if (accountState) accountState.textContent = loggedIn ? "Learner" : "Log in to see your courses";

//Enrolled courses
function renderRow(course) {
    const progress = getCourseProgress(course);

    const row = document.createElement("a");
    row.className = "cat-row";
    row.setAttribute("role", "listitem");
    row.href = lessonUrl(course, getNextLessonIndex(course));

    const cta = progress.complete ? "Review" : progress.done > 0 ? "Continue" : "Start";

    row.innerHTML = `
        <span class="cat-row-mark" data-category="${course.category}"></span>
        <span class="cat-row-main">
            <span class="cat-row-title">${course.title}</span>
            <span class="cat-row-desc">${course.description}</span>
            <span class="cat-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}" aria-label="Progress in ${course.title}">
                <span class="cat-progress-fill" style="width: ${progress.percent}%"></span>
            </span>
            <span class="cat-progress-text">${progress.lessonsDone} of ${progress.lessonsTotal} lessons · ${progress.percent}%</span>
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
        <span class="cat-row-go is-visible">${cta} →</span>
    `;
    return row;
}

function emptyBlock(title, text, ctaLabel, ctaHref) {
    const empty = document.createElement("div");
    empty.className = "cat-empty";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const copy = document.createElement("p");
    copy.textContent = text;

    const cta = document.createElement("a");
    cta.className = "btn btn-primary";
    cta.href = ctaHref;
    cta.textContent = ctaLabel;

    empty.append(heading, copy, cta);
    return empty;
}

function renderCourses() {
    if (!listEl) return;
    listEl.replaceChildren();

    if (!loggedIn) {
        listEl.appendChild(emptyBlock(
            "You're not signed in",
            "Log in to see the courses you've started.",
            "Log in", "login.html"
        ));
        return;
    }

    const owned = getPurchasedIds();
    const myCourses = COURSES.filter(course => owned.includes(course.cat));

    if (myCourses.length === 0) {
        listEl.appendChild(emptyBlock(
            "Nothing on the easel yet",
            "Pick a course and the first thing you finish will show up here.",
            "Browse courses", "catalogue.html"
        ));
        return;
    }

    myCourses.forEach(course => listEl.appendChild(renderRow(course)));
}

//Certificates
function renderCertificates() {
    if (!certListEl) return;
    certListEl.replaceChildren();

    const earned = loggedIn ? getCertificates() : [];

    if (earned.length === 0) {
        const note = document.createElement("p");
        note.className = "cert-empty";
        note.textContent = "Finish every lesson in a course and your certificate will appear here.";
        certListEl.appendChild(note);
        return;
    }

    earned.forEach(record => {
        const course = COURSES.find(c => c.cat === record.course);
        if (!course) return;

        const card = document.createElement("a");
        card.className = "cert-card";
        card.href = `certificate.html?cat=${encodeURIComponent(course.cat)}`;

        const badge = document.createElement("span");
        badge.className = "cert-badge";
        badge.setAttribute("aria-hidden", "true");
        badge.textContent = "★";

        const title = document.createElement("span");
        title.className = "cert-card-title";
        title.textContent = course.title;

        const date = document.createElement("span");
        date.className = "cert-card-date";
        date.textContent = `Earned ${new Date(record.date).toLocaleDateString(undefined, {
            year: "numeric", month: "short", day: "numeric"
        })}`;

        card.append(badge, title, date);
        certListEl.appendChild(card);
    });
}

renderCourses();
renderCertificates();