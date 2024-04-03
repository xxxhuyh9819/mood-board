<!--A custom hook that manipulates states in localStorage -->


import {ref} from "vue";

const getItem = (key) => {
    let value = localStorage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value)
    } catch (error) {
        return value;
    }
}

const useStorage = (key, initialState) => {

    const storedValue = getItem(key) ? ref(getItem(key)) : ref(initialState)

    function setItem(newValue){
        storedValue.value = newValue;
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    function clearItem() {
        storedValue.value = []
        localStorage.removeItem(key)
    }
    return {
        storedValue,
        setItem,
        clearItem
    }
}

export {useStorage}