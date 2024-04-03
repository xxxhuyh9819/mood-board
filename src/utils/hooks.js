// A custom hook that manipulates states in localStorage

import {ref} from "vue";

/**
 * A helper function to get the item from localStorage
 * If succeeded, return the parsed item
 * If failed, return null
 */
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

/**
 * A custom hook that manipulates state that needs to be persisted in localStorage
 * @param key the key in localStorage
 * @param initialState the state to be set at the beginning
 */
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