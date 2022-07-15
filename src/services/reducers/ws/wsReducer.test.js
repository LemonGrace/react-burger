import * as types from '../../constants/webSocket';
import {wsReducer} from "./wsState";

const initialState = wsReducer(undefined, {})

describe('wsReducer', () => {
    it('Установка Initial State', () => {
        const result = wsReducer(undefined, {});
        expect(result).toEqual({
            wsConnected: false,
            messages: []
        })
    })

    it('Успешная установка соединения', () => {
        const result = wsReducer(initialState, {type: types.WS_CONNECTION_SUCCESS});
        expect(result).toEqual({
            wsConnected: true,
            messages: []
        })
    })

    it('Ошибка установки соединения', () => {
        const result = wsReducer(initialState, {type: types.WS_CONNECTION_ERROR});
        expect(result).toEqual({
            wsConnected: false,
            messages: []
        })
    })

    it('Закрытие соединения', () => {
        const result = wsReducer(initialState, {type: types.WS_CONNECTION_CLOSED});
        expect(result).toEqual({
            wsConnected: false,
            messages: []
        })
    })

    it('Получение сообщения', () => {
        const result = wsReducer(initialState, {type: types.WS_GET_MESSAGE, payload: data});
        expect(result).toEqual({
            ...initialState,
            messages: [data]
        })
    })

    it('Отправка сообщения', () => {
        const result = wsReducer(initialState, {type: types.WS_SEND_MESSAGE});
        expect(result).toEqual(initialState)
    })
})

const data = {
    orders: [
        {
            ingredients: ["gjjjg939393", "gjjjg939393", "gjjjg939393"],
            name: "Super",
            _id: "3-02433-frikfv",
            status: 'done',
            number: 12,
            createdAt: "2022-05-09",
            updatedAt: "2022-05-09"
        },
        {
            ingredients: ["gjjjg939393", "gjjjg939393", "gjjjg939393"],
            name: "Super",
            _id: "3-02433-frikfv",
            status: 'done',
            number: 12,
            createdAt: "2022-05-09",
            updatedAt: "2022-05-09"
        },
        {
            ingredients: ["gjjjg939393", "gjjjg939393", "gjjjg939393"],
            name: "Super",
            _id: "3-02433-frikfv",
            status: 'done',
            number: 12,
            createdAt: "2022-05-09",
            updatedAt: "2022-05-09"
        }
    ],
    total: 9099,
    totalToday: 445
}