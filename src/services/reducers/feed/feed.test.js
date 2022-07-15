import * as types from '../../constants/feed';
import {feed} from "./feed";

const initialState = feed(undefined, {})
describe('', () => {
    it('установка initial State', () => {
        const result = feed(undefined, {});
        expect(result).toEqual({
            isLoading: false,
            isError: false,
            orderSelected: null
        })
    })

    it('загрузка данных о заказе', () => {
        const result = feed(initialState, {type: types.GET_ORDER_REQUEST});
        expect(result).toEqual({
            isLoading: true,
            isError: false,
            orderSelected: null
        })
    })

    it('ошибка загрузки данных', () => {
        const result = feed(initialState, {type: types.GET_ORDER_ERROR});
        expect(result).toEqual({
            isLoading: false,
            isError: true,
            orderSelected: null
        })
    })

    it('успешная загрузка данных о заказе', () => {
        const result = feed(initialState, {type: types.GET_ORDER_SUCCESS, data: exampleOrderInfo});
        expect(result).toEqual({
            isLoading: false,
            isError: false,
            orderSelected: exampleOrderInfo[0]
        })
    })
})

const exampleOrderInfo = [
    {
        ingredients: ["gjjjg939393", "gjjjg939393", "gjjjg939393"],
        name: "Super",
        _id: "3-02433-frikfv",
        status: 'done',
        number: 12,
        createdAt: "2022-05-09",
        updatedAt: "2022-05-09"
    }
]