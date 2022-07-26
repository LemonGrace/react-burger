import {
    EMAIL_ERROR, EMAIL_REQUEST, EMAIL_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
    USER_LOGOUT_REQUEST_ERROR,
    USER_LOGOUT_REQUEST_SUCCESS,
    USER_REQUEST_ERROR,
    USER_REQUEST_LOADING, USER_REQUEST_SUCCESS, USER_UPDATE_REQUEST_ERROR
} from "../../constants/auth";
import {TAuthActions, TRecoverPasswordActions} from "../../actions/auth";

/** Данные о пользователе */
type TUserState = {
    username: string,
    email: string,
    isUserLoading: boolean,
    isUserRequestFailed: boolean,
    isAuth: boolean,
};
const initialStateUser: TUserState = {
    username: "",
    email: "",
    isUserLoading: false,
    isUserRequestFailed: false,
    isAuth: false,
}

export const user = (state = initialStateUser, action: TAuthActions) => {
    switch (action.type) {
        case USER_REQUEST_LOADING: {
            return {...state, isUserLoading: true};
        }
        case USER_REQUEST_SUCCESS: {
            return {
                username: action.user.name, email: action.user.email,
                isUserLoading: false, isUserRequestFailed: false, isAuth: true
            };
        }
        case USER_REQUEST_ERROR: {
            return {
                ...state, username: "", email: "",
                isUserLoading: false, isUserRequestFailed: true
            };
        }
        case USER_UPDATE_REQUEST_ERROR:
        case USER_LOGOUT_REQUEST_ERROR: {
            return {...state, isUserRequestFailed: true}
        }
        case USER_LOGOUT_REQUEST_SUCCESS: {
            return initialStateUser;
        }
        default:
            return state;
    }
}


/** Восстановление пароля */
type TResetPassword = {
    isRequestLoading: boolean,
    isRequestFailed: boolean,
    isEmailSend: boolean,
    isPasswordReset: boolean
};
const initialStateResetPassword: TResetPassword = {
    isRequestLoading: false,
    isRequestFailed: false,
    isEmailSend: false,
    isPasswordReset: false
}
export const resetPassword = (state = initialStateResetPassword, action: TRecoverPasswordActions) => {
    switch (action.type) {
        case EMAIL_REQUEST:
        case RESET_PASSWORD_REQUEST: {
            return {...state, isRequestLoading: true};
        }
        case EMAIL_ERROR:
        case RESET_PASSWORD_ERROR: {
            return {...state, isRequestFailed: true, isRequestLoading: false};
        }
        case EMAIL_SUCCESS: {
            return {...state, isEmailSend: true, isRequestLoading: false, isRequestFailed: false};
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, isPasswordReset: true, isRequestLoading: false, isRequestFailed: false};
        }
        default:
            return state;
    }
}
