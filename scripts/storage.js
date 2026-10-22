/*
    Every piece of saved state goes through here.

    Three layers:
    1. Session (sessionStorage): who is logged in right now.
    2. Remembered login (localStorage): lets "Remember me" survive closing the tab.
    3. User data (localStorage, one record per username): enrolled courses,
       lesson progress and certificates, so they survive logging out and in again.

    Accounts are stored in localStorage with a hashed password. That is fine for a
    student prototype but is NOT real security: say so in the report.
*/

const KEYS = {
    logged: "logged",
    name: "name",
    remembered: "bs-remembered",
    accounts: "bs-accounts",
    lastUser: "bs-last-user"
};

const DEFAULT_NAME = "GuyNamedSteve";

function readJSON(storage, key, fallback) {
    try {
        const raw = storage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJSON(storage, key, value) {
    storage.setItem(key, JSON.stringify(value));
}

//Session
export function ensureDefaults() {
    if (sessionStorage.getItem(KEYS.logged) !== null) return;

    const remembered = localStorage.getItem(KEYS.remembered);
    if (remembered) {
        sessionStorage.setItem(KEYS.logged, "true");
        sessionStorage.setItem(KEYS.name, remembered);
        return;
    }

    sessionStorage.setItem(KEYS.logged, "false");
    sessionStorage.setItem(KEYS.name, DEFAULT_NAME);
}

export function isLoggedIn() {
    return sessionStorage.getItem(KEYS.logged) === "true";
}

export function getName() {
    return sessionStorage.getItem(KEYS.name) || DEFAULT_NAME;
}

export function login(name, remember = false) {
    sessionStorage.setItem(KEYS.logged, "true");
    sessionStorage.setItem(KEYS.name, name);
    localStorage.setItem(KEYS.lastUser, name);

    if (remember) localStorage.setItem(KEYS.remembered, name);
    else localStorage.removeItem(KEYS.remembered);
}

// Logging out ends the session and forgets the login, but keeps the user's courses, progress and certificates for next time.
export function logout() {
    sessionStorage.setItem(KEYS.logged, "false");
    sessionStorage.setItem(KEYS.name, DEFAULT_NAME);
    localStorage.removeItem(KEYS.remembered);
}

// Used to prefill the username box on the log in page.
export function getLastUser() {
    return localStorage.getItem(KEYS.lastUser) || "";
}

//Accounts
function fallbackHash(text) {
    let h = 5381;
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
    return `f${h >>> 0}`;
}

// crypto.subtle only exists on https and localhost
export async function hashPassword(password) {
    try {
        if (window.crypto && window.crypto.subtle) {
            const bytes = new TextEncoder().encode(`brushstroke:${password}`);
            const digest = await window.crypto.subtle.digest("SHA-256", bytes);
            return Array.from(new Uint8Array(digest))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
        }
    } catch {
        //fallback scenario
    }
    return fallbackHash(password);
}

function getAccounts() {
    return readJSON(localStorage, KEYS.accounts, {});
}

export function accountExists(username) {
    return Boolean(getAccounts()[username.toLowerCase()]);
}

export function emailInUse(email) {
    const wanted = email.toLowerCase();
    return Object.values(getAccounts()).some(a => a.email.toLowerCase() === wanted);
}

export async function createAccount({ username, email, password }) {
    const accounts = getAccounts();
    accounts[username.toLowerCase()] = {
        username,
        email,
        hash: await hashPassword(password)
    };
    writeJSON(localStorage, KEYS.accounts, accounts);
}

// Returns the account (with its real capitalisation) or null.
export async function verifyAccount(username, password) {
    const account = getAccounts()[username.toLowerCase()];
    if (!account) return null;
    return (await hashPassword(password)) === account.hash ? account : null;
}

//Per-user data
function dataKey() {
    return `bs-data-${getName().toLowerCase()}`;
}

function getData() {
    const data = readJSON(localStorage, dataKey(), {});
    return {
        courses: Array.isArray(data.courses) ? data.courses : [],
        progress: data.progress && typeof data.progress === "object" ? data.progress : {},
        certificates: Array.isArray(data.certificates) ? data.certificates : []
    };
}

function saveData(data) {
    writeJSON(localStorage, dataKey(), data);
}

export function getPurchasedIds() {
    return getData().courses.filter(Boolean);
}

export function hasPurchased(id) {
    return getPurchasedIds().includes(id);
}

export function addPurchase(id) {
    if (!id) return false;

    const data = getData();
    if (data.courses.includes(id)) return false;

    data.courses.push(id);
    saveData(data);
    return true;
}

export function clearPurchases() {
    const data = getData();
    data.courses = [];
    data.progress = {};
    saveData(data);
}

// Progress is stored as a list of finished task ids per course ("2-1" = lesson index 2, task index 1)
export function getCompletedTasks(courseId) {
    return getData().progress[courseId] || [];
}

export function isTaskDone(courseId, taskId) {
    return getCompletedTasks(courseId).includes(taskId);
}

export function setTaskDone(courseId, taskId, done) {
    const data = getData();
    const current = new Set(data.progress[courseId] || []);

    if (done) current.add(taskId);
    else current.delete(taskId);

    data.progress[courseId] = [...current];
    saveData(data);
}

//Certificates
export function getCertificates() {
    return getData().certificates;
}

export function hasCertificate(courseId) {
    return getCertificates().some(c => c.course === courseId);
}

// Returns true only the first time, so the celebration fires once
export function issueCertificate(courseId) {
    const data = getData();
    if (data.certificates.some(c => c.course === courseId)) return false;

    data.certificates.push({
        course: courseId,
        date: new Date().toISOString()
    });
    saveData(data);
    return true;
}