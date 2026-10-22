/*
    Renders a printable certificate: certificate.html?cat=<course>.
    Only the learner who earned it can see it.
*/

import { COURSES } from "./data.js";
import { getName, isLoggedIn, getCertificates } from "./storage.js";

const sheet = document.getElementById("certSheet");
const missing = document.getElementById("certMissing");

const params = new URLSearchParams(window.location.search);
const course = COURSES.find(c => c.cat === params.get("cat"));
const record = course && isLoggedIn()
    ? getCertificates().find(c => c.course === course.cat)
    : null;

if (!course || !record) {
    missing.hidden = false;
    sheet.hidden = true;
} else {
    document.title = `BrushStroke — Certificate: ${course.title}`;

    document.getElementById("certName").textContent = getName();
    document.getElementById("certCourse").textContent = course.title;
    document.getElementById("certPiece").textContent = course.finishedPiece;
    document.getElementById("certInstructor").textContent = course.instructor;
    document.getElementById("certDate").textContent = new Date(record.date).toLocaleDateString(
        undefined, { year: "numeric", month: "long", day: "numeric" }
    );

    missing.hidden = true;
    sheet.hidden = false;

    document.getElementById("printCert").addEventListener("click", () => window.print());
}
