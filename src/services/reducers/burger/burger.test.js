import * as types from '../../constants/ingredients';
import {burgerIngredient} from "./burger";


const initialState = burgerIngredient(undefined, {});

describe('burger data reducer', () => {
    it('Установка Initial State', () => {
        const result = burgerIngredient(undefined, {});
        expect(result).toEqual(
            {
                ingredients: [],
                isIngredientsLoading: false,
                isIngredientsFailed: false,
            }
        )
    })

    it('Установка статуса загрузки', () => {
        const result = burgerIngredient(initialState, {type: types.INGREDIENTS_REQUEST});
        expect(result).toEqual({
            ingredients: [],
            isIngredientsLoading: true,
            isIngredientsFailed: false,
        })
    })

    it('Установка статуса ошибки', () => {
        const result = burgerIngredient(initialState, {type: types.INGREDIENTS_ERROR});
        expect(result).toEqual({
            ingredients: [],
            isIngredientsLoading: false,
            isIngredientsFailed: true,
        })
    })

    it('Установка данных с бэка', () => {
        const result = burgerIngredient(initialState, {type: types.INGREDIENTS_SUCCESS, items: exampleData});
        expect(result).toEqual({
            ingredients: exampleData,
            isIngredientsLoading: false,
            isIngredientsFailed: false,
        })
    })
})

export const exampleData = [
    {
        _id:"60d3b41abdacab0026a733c6",
        name:"Краторная булка N-200i",
        type:"bun",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
    },
    {
        _id:"60d3b41abdacab0026a733333",
        name:"Мясо",
        type:"main",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
    },
    {
        _id:"60d3b41abdacab0026a3394946",
        name:"Соус",
        type:"sauce",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
    },
    {
        _id:"60d3b41abdacab0026a736c6",
        name:"Краторная булка N-200i",
        type:"bun",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
    },
]
