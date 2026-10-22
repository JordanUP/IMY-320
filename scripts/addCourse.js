/*
    Enrolment on the course page. This is the first Peak-End moment: the button
    acknowledges the click, then a dialog names the piece the learner will finish
    and paint flecks fall.
*/

import { COURSES } from "./data.js";
import { isLoggedIn, hasPurchased, addPurchase } from "./storage.js";
import { openDialog, paragraph } from "./dialog.js";
import { lessonUrl, getNextLessonIndex, getCourseProgress } from "./lessons.js";

const buyButton = document.getElementById("buyButton");

const params = new URLSearchParams(window.location.search);
const courseId = params.get("cat");
const course = courseId ? COURSES.find(c => c.cat === courseId) : null;

const SETTLE_MS = 700;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showEnrolled(enrolledCourse) {
    const body = [paragraph(enrolledCourse.title, "enrol-course")];

    if (enrolledCourse.finishedPiece) {
        body.push(
            paragraph("What you'll finish", "enrol-label"),
            paragraph(enrolledCourse.finishedPiece, "enrol-piece")
        );
    }

    openDialog({
        title: "You're enrolled",
        body,
        actions: [
            { label: "Start lesson 1", href: lessonUrl(enrolledCourse, 0), variant: "btn-primary" },
            { label: "Keep browsing", href: "catalogue.html", variant: "btn-ghost" }
        ]
    }, { celebrate: true });
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
            { label: "Sign up", href: "signup.html", variant: "btn-ghost" }
        ]
    });
}

// Owned courses send the learner straight back into their next lesson.
function setOwnedState() {
    const progress = getCourseProgress(course);
    buyButton.value = progress.complete
        ? "Review course"
        : progress.done > 0 ? "Continue course" : "Start course";
    buyButton.classList.add("is-owned");
}

if (buyButton && course) {

    if (hasPurchased(course.cat)) setOwnedState();

    buyButton.addEventListener("click", function () {

        if (buyButton.classList.contains("is-owned")) {
            window.location.href = lessonUrl(course, getNextLessonIndex(course));
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
    buyButton.disabled = true;
    buyButton.value = "Course unavailable";
}
