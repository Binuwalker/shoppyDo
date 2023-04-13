import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        loginReq(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userDataValue: action.payload
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            }
        },
        logoutReq(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        logoutSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }
        },
        signupReq(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        signupSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                userDataValue: action.payload
            }
        },
        signupFail(state, action) {
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            }
        },
    }
});

const { actions, reducer } = authSlice;

export const { loginReq, loginSuccess, loginFail, logoutReq, logoutSuccess, signupReq, signupSuccess, signupFail } = actions;

export default reducer;