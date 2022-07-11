import {getUserInfo, userAuth, sendEmail, updatePassword, updateUserInfo, logOut, IUser} from "../../utils/api";
import {deleteCookie, setCookie} from "../../utils/cookie";
import {
    USER_REQUEST_LOADING,
    EMAIL_ERROR,
    EMAIL_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    USER_LOGOUT_REQUEST_ERROR,
    USER_LOGOUT_REQUEST_SUCCESS,
    RESET_PASSWORD_ERROR,
    USER_REQUEST_ERROR,
    USER_UPDATE_REQUEST_ERROR,
    USER_REQUEST_SUCCESS,
    EMAIL_REQUEST
} from '../constants/auth'
import {AppDispatch, AppThunk} from "../../index";
import {ILoginFields} from "../../pages/login/login";
import {IRegistrationFields} from "../../pages/registration/registration";
import {IUserInfo} from "../../pages/profile/profile";
import {IResetPasswordFields} from "../../pages/reset-password/reset-password";
import {IForgotPasswordFields} from "../../pages/forgot-password/forgot-password";


export interface IUserRequestAction {
    readonly type: typeof USER_REQUEST_LOADING;
}

export interface IUserRequestErrorAction {
    readonly type: typeof USER_REQUEST_ERROR;
}

export interface IUserUpdateRequestErrorAction {
    readonly type: typeof USER_UPDATE_REQUEST_ERROR;
}

export interface IUserLogoutRequestErrorAction {
    readonly type: typeof USER_LOGOUT_REQUEST_ERROR;
}

export interface IUserRequestSuccessAction {
    readonly type: typeof USER_REQUEST_SUCCESS;
    readonly user: IUser;
}

export interface IUserUpdateRequestSuccessAction {
    readonly type: typeof USER_LOGOUT_REQUEST_SUCCESS;
}

export type TAuthActions =
    | IUserRequestAction
    | IUserRequestErrorAction
    | IUserUpdateRequestErrorAction
    | IUserLogoutRequestErrorAction
    | IUserRequestSuccessAction
    | IUserUpdateRequestSuccessAction;


export const enter: AppThunk = (form: ILoginFields | IRegistrationFields) => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_REQUEST_LOADING
    });
    userAuth(form).then(res => {
        if (res instanceof Error) {
            return;
        }
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


export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_REQUEST_LOADING
    });
    getUserInfo().then(res => {
        if (res instanceof Error) {
            dispatch({
                type: USER_REQUEST_ERROR
            });
            return;
        }
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

export const updateInfo: AppThunk = (form: IUserInfo) => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_REQUEST_LOADING
    });
    updateUserInfo(form).then(res => {
        if (res instanceof Error) {
            return;
        }
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
}

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_REQUEST_LOADING
    });
    logOut().then(res => {
        if (res instanceof Error) {
            return;
        }
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
}

/** Восстановление пароля */
export interface IEmailRequestAction {
    readonly type: typeof EMAIL_REQUEST;
}

export interface IEmailSuccessAction {
    readonly type: typeof EMAIL_SUCCESS;
}

export interface IEmailErrorAction {
    readonly type: typeof EMAIL_ERROR;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export type TRecoverPasswordActions =
    | IEmailRequestAction
    | IEmailSuccessAction
    | IEmailErrorAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordErrorAction;

export const resetPasswordEmail: AppThunk = (form: IForgotPasswordFields) => (dispatch: AppDispatch) => {
    dispatch({
        type: EMAIL_REQUEST
    });
    sendEmail(form).then(res => {
        if (res instanceof Error) {
            return;
        }
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
}

export const resetPassword: AppThunk = (form: IResetPasswordFields) => (dispatch: AppDispatch) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST
    });
    updatePassword(form).then(res => {
        if (res instanceof Error) {
            return;
        }
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
}