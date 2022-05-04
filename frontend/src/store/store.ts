import { createStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/jwtTokenReducer";






const store = createStore(jwtReducer);
export default store;