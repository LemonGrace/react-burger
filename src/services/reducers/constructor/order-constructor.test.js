import {order} from "./order-constructor";
import * as types from '../../constants/order-constructor';
import {burgerIngredient} from "../burger/burger";
import {exampleData} from "../burger/burger.test";

const initialState = order(undefined, {});
const stateWithData = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    content: [
        {
            ingredient: exampleData[0],
            order: 1
        },
        {
            ingredient: exampleData[0],
            order: 2
        },
        {
            ingredient: exampleData[1],
            order: 3
        },
        {
            ingredient: exampleData[2],
            order: 4
        },
        {
            ingredient: exampleData[1],
            order: 5
        },
    ]
}
const stateWithDataBun = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    content: [
        {
            ingredient: exampleData[0],
            order: 1
        },
        {
            ingredient: exampleData[0],
            order: 2
        },
        {
            ingredient: exampleData[1],
            order: 3
        }
    ]
}

describe('constructor reducer', () => {
    it('Установка initialState', () => {
        const result = initialState;
        expect(result).toEqual(
            {
                order: null,
                orderRequest: false,
                orderFailed: false,
                content: []
            }
        )
    })

    it('Установка статуса загрузки', () => {
        const result = order(initialState, {type: types.CREATE_ORDER_REQUEST});
        expect(result).toEqual({
            order: null,
            orderRequest: true,
            orderFailed: false,
            content: []
        })
    })

    it('Установка статуса ошибки', () => {
        const result = order(initialState, {type: types.CREATE_ORDER_ERROR});
        expect(result).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: true,
            content: []
        })
    })

    it('Получение данных о заказе', () => {
        const result = order(stateWithData, {type: types.CREATE_ORDER_SUCCESS, order: 129});
        expect(result).toEqual({
            ...stateWithData,
            order: 129
        })
    })

    it('Удаление заказа', () => {
        const state = {
            ...stateWithData,
            order: 129
        };
        const result = order(state, {type: types.DELETE_ORDER});
        expect(result).toEqual(initialState)
    })

    it('Добавление ингредиента', () => {
        const result = order(stateWithData, {type: types.ADD_INGREDIENT, item: exampleData[2]})
        expect(result).toEqual({
            ...stateWithData,
            content: [
                ...stateWithData.content,
                {
                    ingredient: exampleData[2],
                    order: 6
                }
            ]
        })
    })

    it('Удаление ингредиента', () => {
        const result = order(stateWithData, {type: types.DELETE_INGREDIENT, id: "60d3b41abdacab0026a733333", order: 3})
        expect(result).toEqual({
            ...stateWithData,
            content: [
                {
                    ingredient: exampleData[0],
                    order: 1
                },
                {
                    ingredient: exampleData[0],
                    order: 2
                },
                {
                    ingredient: exampleData[2],
                    order: 3
                },
                {
                    ingredient: exampleData[1],
                    order: 4
                },
            ]
        })
    })

    it('Перенос', () => {
        const result = order(stateWithData, {type: types.REORDER, from: 5, to: 4});
        expect(result).toEqual({
            ...stateWithData,
            content: [
                {
                    ingredient: exampleData[0],
                    order: 1
                },
                {
                    ingredient: exampleData[0],
                    order: 2
                },
                {
                    ingredient: exampleData[1],
                    order: 3
                },
                {
                    ingredient: exampleData[2],
                    order: 5
                },
                {
                    ingredient: exampleData[1],
                    order: 4
                },
            ]
        })


    })

    it('Замена булочки', () => {
        const result = order(stateWithDataBun, {type: types.REPLACE_BUN, item: exampleData[3]})
        expect(result).toEqual({
            ...stateWithDataBun,
            content: [
                {
                    ingredient: exampleData[1],
                    order: 3
                },
                {
                    ingredient: exampleData[3],
                    order: 1
                },
                {
                    ingredient: exampleData[3],
                    order: 2
                },
            ]
        })
    })


    it('Вызов с типом default', () => {
        const result = order(initialState, {type: types.DEFAULT});
        expect(result).toEqual(initialState)
    })
})