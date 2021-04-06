/**
 * Tests the availability of localStorage and wether the script is allowed to
 * access it.
 *
 * @returns Wether localStorage is available and can be used.
 */
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
