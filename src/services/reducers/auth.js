export const USER_REQUEST_LOADING = 'USER_REQUEST_LOADING';
/** Используем для удаления записи о существующем пользователе при ошибках в запросах register + login + user */
export const USER_REQUEST_ERROR = 'USER_REQUEST_ERROR';
/** Используем для сохранения информации о существующем пользователе, если обновление или выход не удался */
export const USER_UPDATE_REQUEST_ERROR = 'USER_UPDATE_REQUEST_ERROR';
export const USER_LOGOUT_REQUEST_ERROR = 'USER_LOGOUT_REQUEST_ERROR';
/** При логине и регистрации записываем вместо пустых данных , при обновлении перезаписываем */
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
/** Удаление пользователя при выходе из профиля */
export const USER_LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS';

/** Данные о пользователе */
const initialStateUser = {
    username: "",
    email: "",
    isUserLoading: false,
    isUserRequestFailed: false,
    isAuth: false,
}

export const user = (state = initialStateUser, action) => {
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
            return {...state, username: "", email: "",isUserRequestFailed: true, isUserLoading: false};
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
export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const EMAIL_ERROR = 'EMAIL_ERROR';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

const initialStateResetPassword = {
    isRequestLoading: false,
    isRequestFailed: false,
    isEmailSend: false,
    isPasswordReset: false
}
export const resetPassword = (state = initialStateResetPassword, action) => {
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
