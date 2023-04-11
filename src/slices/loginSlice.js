import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        emailError: false,
        passwordError: false,
        emailSuccess: false,
        passwordSuccess: false
    },
    reducers: {

        loginEmailFail(state, action) {
            return {
                ...state,
                emailError: true,
                emailErrorMsg: action.payload,
                emailSuccess: false
            }
        },
        loginEmailSuccess(state, action) {
            return {
                ...state,
                emailError: false,
                emailErrorMsg: '',
                emailSuccess: true
            }
        },
        loginPasswordFail(state, action) {
            return {
                ...state,
                passwordError: true,
                passwordErrorMsg: action.payload,
                passwordSuccess: false
            }
        },
        loginPasswordSuccess(state, action) {
            return {
                ...state,
                passwordError: false,
                passwordErrorMsg: '',
                passwordSuccess: true
            }
        },
        logoutSuccess(state, action) {
            return {
                ...state,
                emailSuccess: false,
                passwordSuccess: false,
                emailError: true,
                passwordError: true
            }
        }
    }
});

const { actions, reducer } = loginSlice;

export const { loginEmailFail, loginEmailSuccess, loginPasswordFail, loginPasswordSuccess, logoutSuccess } = actions;

export default reducer;