/*
    Turns each course module in data.js into a lesson, and works out progress from the
    task ids saved in storage.js.

    Each module in data.js has { title, focus, tasks: [four strings] }.
*/

import { getCompletedTasks } from "./storage.js";

export function getLessons(course) {
    return course.modules.map((module, lessonIndex) => {
        const taskLabels = module.tasks || [
            `Read the lesson notes for "${module.title}"`,
            `Practise: ${module.focus}`,
            "Save a checkpoint of your work so you can compare it later"
        ];

        return {
            index: lessonIndex,
            number: lessonIndex + 1,
            title: module.title,
            focus: module.focus,
            tasks: taskLabels.map((label, taskIndex) => ({
                id: `${lessonIndex}-${taskIndex}`,
                label
            }))
        };
    });
}

export function lessonDoneCount(course, lesson) {
    const done = getCompletedTasks(course.cat);
    return lesson.tasks.filter(task => done.includes(task.id)).length;
}

export function isLessonComplete(course, lesson) {
    return lessonDoneCount(course, lesson) === lesson.tasks.length;
}

export function getCourseProgress(course) {
    const lessons = getLessons(course);
    const total = lessons.reduce((sum, lesson) => sum + lesson.tasks.length, 0);
    const done = lessons.reduce((sum, lesson) => sum + lessonDoneCount(course, lesson), 0);

    return {
        done,
        total,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
        complete: total > 0 && done === total,
        lessonsDone: lessons.filter(lesson => isLessonComplete(course, lesson)).length,
        lessonsTotal: lessons.length
    };
}

// The first lesson that still has something to do, or the last lesson once everything is done.
export function getNextLessonIndex(course) {
    const lessons = getLessons(course);
    const next = lessons.find(lesson => !isLessonComplete(course, lesson));
    return next ? next.index : lessons.length - 1;
}

export function lessonUrl(course, lessonIndex) {
    return `lesson.html?cat=${encodeURIComponent(course.cat)}&lesson=${lessonIndex + 1}`;
}