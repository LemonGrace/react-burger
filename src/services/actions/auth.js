import {getUserInfo, userAuth, sendEmail, updatePassword, updateUserInfo, logOut} from "../../utils/api";
import {deleteCookie, setCookie} from "../../utils/cookie";

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export function createUser(form) {
    return function(dispatch) {
        dispatch({
            type: CREATE_USER_REQUEST
        });
        userAuth(form).then(res => {
            if (res && res.success) {

                setCookie('refreshToken', res.refreshToken);
                setCookie('token', res.accessToken.split('Bearer ')[1]);
                dispatch({
                    type: CREATE_USER_SUCCESS,
                });
                dispatch({
                    type: SET_USER,
                    user: res.user
                })
            } else {
                dispatch({
                    type: CREATE_USER_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: CREATE_USER_ERROR
            });
        });
    };
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function loginUser(form) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        userAuth(form).then(res => {
            if (res && res.success) {
                setCookie('refreshToken', res.refreshToken);
                setCookie('token', res.accessToken.split('Bearer ')[1]);
                dispatch({
                    type: LOGIN_SUCCESS,
                });
                dispatch({
                    type: SET_USER,
                    user: res.user
                });
            } else {
                dispatch({
                    type: LOGIN_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: LOGIN_ERROR
            });
        });
    };
}

export const USER_REQUEST = 'USER_REQUEST';
export const SET_USER = 'SET_USER';
export const USER_ERROR = 'USER_ERROR';
export function getUser() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        getUserInfo().then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    user: res.user
                });
            } else {
                dispatch({
                    type: USER_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_ERROR
            });
        });
    };
}

export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const EMAIL_ERROR = 'EMAIL_ERROR';

export function resetPasswordEmail(form) {
    return function(dispatch) {
        dispatch({
            type: EMAIL_REQUEST
        });
        sendEmail(form).then(res => {
            if (res && res.success) {
                setCookie('emailResetSend', true);
                dispatch({
                    type: EMAIL_SUCCESS,
                });
            } else {
                dispatch({
                    type: EMAIL_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: EMAIL_ERROR
            });
        });
    };
}

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export function resetPassword(form) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        updatePassword(form).then(res => {
            if (res && res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                });
            } else {
                dispatch({
                    type: RESET_PASSWORD_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: RESET_PASSWORD_ERROR
            });
        });
    };
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export function updateInfo (form) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_REQUEST
        });
        updateUserInfo(form).then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    user: res.user
                });
            } else {
                dispatch({
                    type: UPDATE_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: UPDATE_ERROR
            });
        });
    };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const DELETE_USER = 'DELETE_USER';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export function logout () {
    return function(dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logOut().then(res => {
            if (res && res.success) {
                deleteCookie('refreshToken')
                deleteCookie('token')
                dispatch({
                    type: DELETE_USER,
                });
            } else {
                dispatch({
                    type: LOGOUT_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: LOGOUT_ERROR
            });
        });
    };
}