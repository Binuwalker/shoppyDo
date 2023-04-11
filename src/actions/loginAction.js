import { loginEmailFail, loginPasswordFail, loginEmailSuccess, loginPasswordSuccess } from "../slices/loginSlice";

export const login = ({ email, password }) => (dispatch) => {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;

    //email validation
    if (!email) {
        const emailErrorMsg = 'Please enter your email';
        dispatch(loginEmailFail(emailErrorMsg));
    } else if (!regexEmail.test(email)) {
        const emailErrorMsg = 'Please enter a valid email';
        dispatch(loginEmailFail(emailErrorMsg));
    } else {
        dispatch(loginEmailSuccess());
    }

    //password validation
    if (!password) {
        const passwordErrorMsg = 'Please enter your pasword';
        dispatch(loginPasswordFail(passwordErrorMsg));
    } else if (!regexPassword.test(password)) {
        const passwordErrorMsg = 'Please enter a valid password';
        dispatch(loginPasswordFail(passwordErrorMsg));
    } else if (password.length > 8) {
        const passwordErrorMsg = 'Password cannot exceed 8 characters';
        dispatch(loginPasswordFail(passwordErrorMsg));
    } else {
        dispatch(loginPasswordSuccess());
    }
}
