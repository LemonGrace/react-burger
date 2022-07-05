export const USER_REQUEST_LOADING: 'USER_REQUEST_LOADING' = 'USER_REQUEST_LOADING';
/** Используем для удаления записи о существующем пользователе при ошибках в запросах register + login + user */
export const USER_REQUEST_ERROR: 'USER_REQUEST_ERROR' = 'USER_REQUEST_ERROR';
/** Используем для сохранения информации о существующем пользователе, если обновление или выход не удался */
export const USER_UPDATE_REQUEST_ERROR: 'USER_UPDATE_REQUEST_ERROR' = 'USER_UPDATE_REQUEST_ERROR';
export const USER_LOGOUT_REQUEST_ERROR: 'USER_LOGOUT_REQUEST_ERROR' = 'USER_LOGOUT_REQUEST_ERROR';
/** При логине и регистрации записываем вместо пустых данных, при обновлении перезаписываем */
export const USER_REQUEST_SUCCESS: 'USER_REQUEST_SUCCESS' = 'USER_REQUEST_SUCCESS';
/** Удаление пользователя при выходе из профиля */
export const USER_LOGOUT_REQUEST_SUCCESS: 'USER_LOGOUT_REQUEST_SUCCESS' = 'USER_LOGOUT_REQUEST_SUCCESS';

/** Восстановление пароля */
export const EMAIL_REQUEST: 'EMAIL_REQUEST' = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS: 'EMAIL_SUCCESS' = 'EMAIL_SUCCESS';
export const EMAIL_ERROR: 'EMAIL_ERROR' = 'EMAIL_ERROR';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR' = 'RESET_PASSWORD_ERROR';