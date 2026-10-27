/*
    One lesson per page: lesson.html?cat=<course>&lesson=<number>.
    Each lesson has a checklist of tasks. Progress is saved as boxes are ticked.
    Finishing the last task of the last lesson unlocks "Finish course", which issues a certificate 
    and plays the second Peak-End moment.
*/

import { COURSES } from "./data.js";
import {
    isLoggedIn, hasPurchased, isTaskDone, setTaskDone, issueCertificate, hasCertificate, hasSeenHalfway, markHalfwaySeen
} from "./storage.js";
import {
    getLessons, getCourseProgress, isLessonComplete, lessonDoneCount, lessonUrl
} from "./lessons.js";
import { openDialog, paragraph } from "./dialog.js";
import { showToast } from "./toast.js";

const gateEl = document.getElementById("lessonGate");
const shellEl = document.getElementById("lessonShell");

const params = new URLSearchParams(window.location.search);
const course = COURSES.find(c => c.cat === params.get("cat"));
const lessonNumber = Number.parseInt(params.get("lesson"), 10);

function showGate(title, message, linkLabel, linkHref) {
    document.getElementById("gateTitle").textContent = title;
    document.getElementById("gateMessage").textContent = message;

    const link = document.getElementById("gateLink");
    link.textContent = linkLabel;
    link.href = linkHref;

    gateEl.hidden = false;
    shellEl.hidden = true;
}

//  Gate: only enrolled, logged-in learners see lessons

if (!course) {
    showGate("Lesson not found", "That link doesn't match a course we offer.", "Back to catalogue", "catalogue.html");
} else if (!isLoggedIn()) {
    showGate("Log in to start learning", "Lessons are saved to your account so you can pick up where you left off.", "Log in", "login.html");
} else if (!hasPurchased(course.cat)) {
    showGate(`Enrol in ${course.title} first`, "It's free, and it only takes a click.", "Go to the course", `courses.html?cat=${encodeURIComponent(course.cat)}`);
} else {
    start();
}

function start() {
    const lessons = getLessons(course);
    const index = Number.isInteger(lessonNumber) && lessonNumber >= 1 && lessonNumber <= lessons.length
        ? lessonNumber - 1
        : 0;
    const lesson = lessons[index];
    const isLast = index === lessons.length - 1;

    // If an existing learner is already past halfway remember it quietly so they don't get a surprise "halfway" toast at 80% later.
    if (!hasSeenHalfway(course.cat) && getCourseProgress(course).percent >= 50) {
        markHalfwaySeen(course.cat);
    }

    document.title = `BrushStroke — ${lesson.title}`;
    gateEl.hidden = true;
    shellEl.hidden = false;

    renderSidebar(lessons, index);
    renderLesson(lesson, lessons.length);
    renderFooter(lessons, index, isLast);
    refreshProgress(lessons, index);
}

/* ---------------------------------------------------------------------------
 * Rendering
 * ------------------------------------------------------------------------ */

function renderSidebar(lessons, activeIndex) {
    const courseLink = document.getElementById("lessonCourseLink");
    courseLink.textContent = course.title;
    courseLink.href = `courses.html?cat=${encodeURIComponent(course.cat)}`;

    const nav = document.getElementById("lessonNav");
    nav.replaceChildren();

    lessons.forEach(lesson => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = lessonUrl(course, lesson.index);
        a.dataset.lesson = String(lesson.index);
        if (lesson.index === activeIndex) a.setAttribute("aria-current", "page");

        const mark = document.createElement("span");
        mark.className = "lesson-mark";
        mark.setAttribute("aria-hidden", "true");

        const text = document.createElement("span");
        text.className = "lesson-nav-title";
        text.textContent = `Lesson ${lesson.number}: ${lesson.title}`;

        a.append(mark, text);
        li.appendChild(a);
        nav.appendChild(li);
    });
}

function renderLesson(lesson, total) {
    document.getElementById("lessonKicker").textContent = `Lesson ${lesson.number} of ${total}`;
    document.getElementById("lessonTitle").textContent = lesson.title;
    document.getElementById("lessonDetail").textContent = `Focus: ${lesson.focus}`;

    const list = document.getElementById("taskList");
    list.replaceChildren();

    lesson.tasks.forEach(task => {
        const li = document.createElement("li");

        const label = document.createElement("label");
        label.className = "task";

        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = isTaskDone(course.cat, task.id);

        const text = document.createElement("span");
        text.textContent = task.label;

        label.append(box, text);
        li.appendChild(label);
        list.appendChild(li);

        box.addEventListener("change", () => {
            setTaskDone(course.cat, task.id, box.checked);
            const lessons = getLessons(course);
            refreshProgress(lessons, lesson.index);
            renderFooter(lessons, lesson.index, lesson.index === lessons.length - 1);
            maybeCelebrateHalfway(box.checked);
        });
    });
}

function renderFooter(lessons, index, isLast) {
    const prev = document.getElementById("prevLesson");
    const next = document.getElementById("nextLesson");
    const finish = document.getElementById("finishCourse");

    prev.hidden = index === 0;
    if (index > 0) prev.href = lessonUrl(course, index - 1);

    next.hidden = isLast;
    if (!isLast) {
        next.href = lessonUrl(course, index + 1);
        next.classList.toggle("is-ready", isLessonComplete(course, lessons[index]));
    }

    finish.hidden = !isLast;
    if (isLast) {
        const progress = getCourseProgress(course);
        const owned = hasCertificate(course.cat);

        finish.disabled = !progress.complete;
        finish.value = owned ? "View your certificate" : "Finish course";
        finish.title = progress.complete ? "" : "Tick every task in every lesson to finish.";
    }
}

// The small "lesson complete" tick is deliberate, saving the big celebration for finishing the whole course.
function refreshProgress(lessons, activeIndex) {
    const progress = getCourseProgress(course);

    document.getElementById("progressText").textContent =
        `${progress.lessonsDone} of ${progress.lessonsTotal} lessons complete`;
    document.getElementById("progressPercent").textContent = `${progress.percent}%`;

    const bar = document.getElementById("progressFill");
    bar.style.width = `${progress.percent}%`;
    bar.parentElement.setAttribute("aria-valuenow", String(progress.percent));

    document.querySelectorAll("#lessonNav a").forEach(a => {
        const lesson = lessons[Number(a.dataset.lesson)];
        a.classList.toggle("is-done", isLessonComplete(course, lesson));
    });

    const active = lessons[activeIndex];
    const doneHere = lessonDoneCount(course, active);
    const status = document.getElementById("lessonStatus");

    if (doneHere === active.tasks.length) {
        status.textContent = "Lesson complete";
        status.classList.add("is-done");
    } else {
        status.textContent = `${doneHere} of ${active.tasks.length} tasks done`;
        status.classList.remove("is-done");
    }
}

// Fires once per course, the first time a tick pushes progress to 50% or more.
function maybeCelebrateHalfway(justTicked) {
    if (!justTicked) return;

    const progress = getCourseProgress(course);
    if (progress.percent < 50) return;

    if (!markHalfwaySeen(course.cat)) return;

    showToast({
        title: "Halfway there",
        message: `You're 50% through ${course.title}. Keep going — your finished piece is closer than you think.`
    });
}

/* ---------------------------------------------------------------------------
 * Finishing the course: the second peak
 * ------------------------------------------------------------------------ */

document.getElementById("finishCourse")?.addEventListener("click", () => {
    if (!course) return;

    const certificateHref = `certificate.html?cat=${encodeURIComponent(course.cat)}`;

    if (hasCertificate(course.cat)) {
        window.location.href = certificateHref;
        return;
    }

    if (!getCourseProgress(course).complete) return;

    issueCertificate(course.cat);

    openDialog({
        title: "Course complete",
        body: [
            paragraph(course.title, "enrol-course"),
            paragraph("You finished it", "enrol-label"),
            paragraph(course.finishedPiece, "enrol-piece")
        ],
        actions: [
            { label: "View certificate", href: certificateHref, variant: "btn-primary" },
            { label: "Back to profile", href: "profile.html#myCertificates", variant: "btn-ghost" }
        ]
    }, { celebrate: true });

    const lessons = getLessons(course);
    renderFooter(lessons, lessons.length - 1, true);
});