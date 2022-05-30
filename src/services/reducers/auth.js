import {
    CREATE_USER_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS, DELETE_USER,
    EMAIL_ERROR,
    EMAIL_REQUEST,
    EMAIL_SUCCESS,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    SET_USER, UPDATE_ERROR, UPDATE_REQUEST,
    USER_ERROR,
    USER_REQUEST
} from "../actions/auth";


/** Данные о пользователе */
const initialStateUser = {
    user: {
        email: "",
        name: ""
    },
    userInfoRequest: false,
    userInfoFailed: false,
    updateRequest: false,
    updateFailed: false,
    logoutRequest: false,
    logoutFailed: false
}
export const user = (state = initialStateUser, action) => {
    switch (action.type) {
        case USER_REQUEST: {
            return {...state, userInfoRequest: true};
        }
        case UPDATE_REQUEST: {
            return {...state, updateRequest: true};
        }
        case LOGIN_REQUEST: {
            return {...state, logoutRequest: true};
        }
        case SET_USER: {
            return { ...state, user: action.user, userInfoRequest: false, userInfoFailed: false,
                updateRequest: false, updateFailed: false};
        }
        case DELETE_USER: {
            return { ...state, user: {
                    email: "",
                    name: ""
                }, userInfoRequest: false, userInfoFailed: false,
                updateRequest: false, updateFailed: false, logoutFailed: false, logoutRequest: false};
        }
        case LOGIN_ERROR: {
            return { ...state, logoutFailed: true, logoutRequest: false };
        }
        case USER_ERROR: {
            return { ...state, userInfoFailed: true, userInfoRequest: false };
        }
        case UPDATE_ERROR: {
            return {...state, updateRequest: false, updateFailed: false}
        }
        
        default: return state;
    }
}

/** Редьюсер для работы с авторизацией*/
const initialStateLogin = {
    loginRequest: false,
    loginFailed: false,
}
export const login = (state = initialStateLogin, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, loginRequest: true};
        }
        case LOGIN_SUCCESS: {
            return { ...state, loginFailed: false, loginRequest: false };
        }
        case LOGIN_ERROR: {
            return { ...state, loginFailed: true, loginRequest: false };
        }
        default: return state;
    }
}

/** Редьюсер для работы с регистрацией*/
const initialStateRegistration = {
    createRequest: false,
    createFailed: false,
}
export const registration = (state = initialStateRegistration, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST: {
            return {...state, createRequest: true};
        }
        case CREATE_USER_SUCCESS: {
            return { ...state, createFailed: false, createRequest: false };
        }
        case CREATE_USER_ERROR: {
            return { ...state, createFailed: true, createRequest: false };
        }
        default: return state;
    }
}


const initialStateResetPassword = {
    sendEmailRequest: false,
    sendEmailFailed: false,
    codeSuccessSend: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false
}
export const resetPassword = (state = initialStateResetPassword, action) => {
    switch (action.type) {
        case EMAIL_REQUEST: {
            return {...state, sendEmailRequest: true};
        }
        case EMAIL_SUCCESS: {
            return { ...state, codeSuccessSend: true, sendEmailRequest: false, sendEmailFailed: false };
        }
        case EMAIL_ERROR: {
            return { ...state, sendEmailFailed: true, sendEmailRequest: false };
        }
        case RESET_PASSWORD_REQUEST: {
            return {...state, resetPasswordRequest: true};
        }
        case RESET_PASSWORD_SUCCESS: {
            return { ...state, resetPasswordRequest: false, resetPasswordFailed: false };
        }
        case RESET_PASSWORD_ERROR: {
            return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
        }
        default: return state;
    }
}
