export const getStorage = (key) => {
    if (typeof (Storage) !== undefined) {
        return sessionStorage.getItem(key);
    }
    return null;
}
export const setStorage = (key, data) => {
    if (typeof (Storage) !== undefined) { 
        sessionStorage.setItem(key, data)
    }
}