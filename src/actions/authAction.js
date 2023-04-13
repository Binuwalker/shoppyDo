import { firebaseData } from "../firebase/config";
import { loginReq, loginSuccess, loginFail, signupFail, signupSuccess, signupReq } from "../slices/authSlice";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export const login = ({ email, password }) => async (dispatch) => {

    const q = query(collection(firebaseData, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let userDataValue = querySnapshot.docs[0]?.data();

    try {
        dispatch(loginReq())
        if (userDataValue === undefined && email) {
            let errorMsg = "Id not found with this Email";
            dispatch(loginFail(errorMsg));
        } else {
            if (!email && !password) {
                let errorMsg = "Please Enter the Fields"
                dispatch(loginFail(errorMsg))
            } else if (userDataValue.password === undefined) {
                let errorMsg = "Password not found";
                dispatch(loginFail(errorMsg))
            } else if (password !== userDataValue.password) {
                let errorMsg = "Invalid Password";
                dispatch(loginFail(errorMsg))
            } else if (userDataValue.password === password) {
                localStorage.setItem('userKey', JSON.stringify({ email, password }));
                dispatch(loginSuccess(userDataValue))
            }
        }
    } catch (err) {
        console.error('login_failed: ' + err.message + ', Please Contact the Owner');
        dispatch(loginFail('login_failed: ' + err.message + ', Please Contact the Owner'));
    }
}

export const signup = ({ userName, email, phoneNumber, password }) => async (dispatch) => {
    let getDateValue = new Date();
    let getMonth = getDateValue.getMonth() + 1
    let joinedOn = getDateValue.getDate() + '/' + getMonth + '/' + getDateValue.getFullYear();
    try {
        dispatch(signupReq())
        if (userName && email && phoneNumber && password) {
            await addDoc(collection(firebaseData, 'users'),
                {
                    userName,
                    email,
                    phoneNumber,
                    password,
                    joinedOn
                }
            );
            localStorage.setItem('userKey', JSON.stringify({ email, password }));
            dispatch(signupSuccess({ userName, email, phoneNumber, password, joinedOn }))
        } else if (!userName || !email || !phoneNumber || !password) {
            let errorMsg = "Enter All the required Fields";
            dispatch(signupFail(errorMsg));
        }
    } catch (err) {
        console.error("signup_failed: " + err.message);
        dispatch(signupFail("signup_failed: " + err.message));
    }
}