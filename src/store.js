import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./slices/loginSlice";

const reducer = combineReducers({
    loginState: loginReducer
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;