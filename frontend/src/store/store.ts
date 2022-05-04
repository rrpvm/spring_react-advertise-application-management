import { createStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/jwtTokenReducer";




export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
    }
};
const persistedState = loadState();
const store = createStore(jwtReducer,persistedState);
store.subscribe(() => {
    saveState(store.getState());
})
export default store;