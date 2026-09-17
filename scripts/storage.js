/*
    Keeps all session storage states in here
 */

const KEYS = {
    logged: "logged",
    name: "name",
    courses: "courses"
};

const DEFAULT_STATE = {
    logged: false,
    name: "GuyNamedSteve"
};

export function ensureDefaults() {
    if (sessionStorage.getItem(KEYS.logged) === null) {
        sessionStorage.setItem(KEYS.logged, String(DEFAULT_STATE.logged));
        sessionStorage.setItem(KEYS.name, DEFAULT_STATE.name);
    }
}

export function isLoggedIn() {
    return sessionStorage.getItem(KEYS.logged) === "true";
}

export function getName() {
    return sessionStorage.getItem(KEYS.name) || DEFAULT_STATE.name;
}

export function login(name) {
    sessionStorage.setItem(KEYS.logged, "true");
    sessionStorage.setItem(KEYS.name, name);
}

export function logout() {
    sessionStorage.removeItem(KEYS.logged);
    sessionStorage.removeItem(KEYS.name);
    sessionStorage.removeItem(KEYS.courses);
    ensureDefaults();
}

export function getPurchasedIds() {
    try {
        const raw = sessionStorage.getItem(KEYS.courses);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
        sessionStorage.removeItem(KEYS.courses);
        return [];
    }
}

export function hasPurchased(id) {
    return getPurchasedIds().includes(id);
}

export function addPurchase(id) {
    if (!id) return false;

    const owned = getPurchasedIds();
    if (owned.includes(id)) return false; //no dupes

    owned.push(id);
    sessionStorage.setItem(KEYS.courses, JSON.stringify(owned));
    return true;
}

export function clearPurchases() {
    sessionStorage.removeItem(KEYS.courses);
}