import * as types from '../../constants/auth';
import {resetPassword} from "./auth";
import {RESET_PASSWORD_ERROR, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../../constants/auth";

const initialState = resetPassword(undefined, {});
const initialStateEmailSend = {
    isRequestLoading: false,
    isRequestFailed: false,
    isEmailSend: true,
    isPasswordReset: false
}

describe('reset password reducer', () => {
    it('Установка Initial State', () => {
        const result = resetPassword(undefined, {});
        expect(result).toEqual({
            isRequestLoading: false,
            isRequestFailed: false,
            isEmailSend: false,
            isPasswordReset: false
        })
    })

    it('Запрос email', () => {
        const result = resetPassword(initialState, {type: types.EMAIL_REQUEST});
        expect(result).toEqual({
            ...initialState,
            isRequestLoading: true,
        })
    })

    it('Запрос на сброс пароля', () => {
        const result = resetPassword(initialState, {type: types.RESET_PASSWORD_REQUEST});
        expect(result).toEqual({
            ...initialState,
            isRequestLoading: true,
        })
    })

    it('Ошибка отправки письма на почту', () => {
        const result = resetPassword(initialState, {type: types.EMAIL_ERROR});
        expect(result).toEqual({
            ...initialState,
            isRequestFailed: true,
        })
    })

    it('Ошибка сброса пароля', () => {
        const result = resetPassword(initialState, {type: types.RESET_PASSWORD_ERROR});
        expect(result).toEqual({
            ...initialState,
            isRequestFailed: true,
        })
    })

    it('Письмо успешно отправлено', () => {
        const result = resetPassword(initialState, {type: types.EMAIL_SUCCESS});
        expect(result).toEqual({
            ...initialStateEmailSend,
            isEmailSend: true,
        })
    })

    it('Пароль успешно сброшен', () => {
        const result = resetPassword(initialStateEmailSend, {type: types.RESET_PASSWORD_SUCCESS});
        expect(result).toEqual({
            ...initialStateEmailSend,
            isEmailSend: true,
            isPasswordReset: true
        })
    })
})