export function isLocalStorageAvailable() {
    const testKey = 'test';
    try {
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}
