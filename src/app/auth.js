const STORAGE_KEY = 'authUser';
export function getUserFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data)
        return null;
    try {
        return JSON.parse(data);
    }
    catch {
        console.error('Stored user data is invalid JSON');
        return null;
    }
}
export function saveUserToStorage(user) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    catch (err) {
        console.error('Could not save user to storage', err);
    }
}
export function clearUserFromStorage() {
    localStorage.removeItem(STORAGE_KEY);
}
