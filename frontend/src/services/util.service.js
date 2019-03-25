export default {
    saveToStorage,
    getFromStorage
};

function saveToStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key){
    let value = localStorage.getItem(key);
    if(!value) return value;
    return JSON.parse(value);
}