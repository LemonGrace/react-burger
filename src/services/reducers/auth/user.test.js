import * as types from '../../constants/auth';
import {user} from "./auth";

const initialState = user(undefined, {});
const stateUserAuth = {
    username: "alla",
    email: "gg@r.rr",
    isUserLoading: false,
    isUserRequestFailed: false,
    isAuth: true,
}

describe('reset password reducer', () => {
    it('Установка Initial State', () => {
        const result = user(undefined, {});
        expect(result).toEqual({
            username: "",
            email: "",
            isUserLoading: false,
            isUserRequestFailed: false,
            isAuth: false,
        })
    })

    it('Загрузка пользователя', () => {
        const result = user(initialState, {type: types.USER_REQUEST_LOADING});
        expect(result).toEqual({
            username: "",
            email: "",
            isUserLoading: true,
            isUserRequestFailed: false,
            isAuth: false,
        })
    })

    it('Ошибка загрузки пользователя', () => {
        const result = user(initialState, {type: types.USER_REQUEST_ERROR});
        expect(result).toEqual({
            username: "",
            email: "",
            isUserLoading: false,
            isUserRequestFailed: true,
            isAuth: false,
        })
    })

    it('Данные о пользователе получены', () => {
        const result = user(initialState, {
            type: types.USER_REQUEST_SUCCESS, user: {
                name: "alla",
                email: "gg@r.rr"
            }
        });
        expect(result).toEqual(stateUserAuth);
    })

    it('Ошибка обновления данных', () => {
        const result = user(stateUserAuth, {type: types.USER_UPDATE_REQUEST_ERROR});
        expect(result).toEqual({
            username: "alla",
            email: "gg@r.rr",
            isUserLoading: false,
            isUserRequestFailed: true,
            isAuth: true,
        })
    })

    it('Ошибка выхода из профиля', () => {
        const result = user(stateUserAuth, {type: types.USER_LOGOUT_REQUEST_ERROR});
        expect(result).toEqual({
            username: "alla",
            email: "gg@r.rr",
            isUserLoading: false,
            isUserRequestFailed: true,
            isAuth: true,
        })
    })

    it('Успешный выход', () => {
        const result = user(stateUserAuth, {type: types.USER_LOGOUT_REQUEST_SUCCESS});
        expect(result).toEqual(initialState);
    })
})