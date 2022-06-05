import {getUserInfo, userAuth, sendEmail, updatePassword, updateUserInfo, logOut} from "../../utils/api";
import {deleteCookie, setCookie} from "../../utils/cookie";
import {
    EMAIL_ERROR,
    EMAIL_REQUEST, EMAIL_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
    USER_LOGOUT_REQUEST_ERROR, USER_LOGOUT_REQUEST_SUCCESS,
    USER_REQUEST_ERROR,
    USER_REQUEST_LOADING, USER_REQUEST_SUCCESS,
    USER_UPDATE_REQUEST_ERROR
} from "../reducers/auth";

export function enter(form) {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST_LOADING
        });
        userAuth(form).then(res => {
            if (res && res.success) {
                setCookie('refreshToken', res.refreshToken);
                setCookie('token', res.accessToken.split('Bearer ')[1]);
                dispatch({
                    type: USER_REQUEST_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: USER_REQUEST_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_REQUEST_ERROR
            });
        });
    };
}

export function getUser() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST_LOADING
        });
        getUserInfo().then(res => {
            if (res && res.success) {
                dispatch({
                    type: USER_REQUEST_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: USER_REQUEST_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_REQUEST_ERROR
            });
        });
    };
}

export function updateInfo(form) {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST_LOADING
        });
        updateUserInfo(form).then(res => {
            if (res && res.success) {
                dispatch({
                    type: USER_REQUEST_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: USER_UPDATE_REQUEST_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_UPDATE_REQUEST_ERROR
            });
        });
    };
}

export function logout () {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST_LOADING
        });
        logOut().then(res => {
            if (res && res.success) {
                deleteCookie('refreshToken')
                deleteCookie('token')
                dispatch({
                    type: USER_LOGOUT_REQUEST_SUCCESS,
                });
            } else {
                dispatch({
                    type: USER_LOGOUT_REQUEST_ERROR
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_LOGOUT_REQUEST_ERROR
            });
        });
    };
}


export function resetPasswordEmail(form) {
    return function(dispatch) {
        dispatch({
            type: EMAIL_REQUEST
        });
        sendEmail(form).then(res => {
            if (res && res.success) {
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