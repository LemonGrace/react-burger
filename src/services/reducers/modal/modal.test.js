import {modal} from "./modal";
import * as types from '../../constants/modal';

const initialState = modal(undefined, {});

describe('modal reducer', () => {
    it('Установка initialState', () => {
        const result = initialState;
        expect(result).toEqual(
            {
                isVisible: false,
                typeModal: '',
            }
        )
    })

    it('Установка статуса видимости', () => {
        const result = modal(initialState, {type: types.SET_VISIBLE});
        expect(result).toEqual({
            ...initialState,
            isVisible: true,
        })
    })

    it('Установка статуса невидимости', () => {
        const result = modal(initialState, {type: types.DELETE_VISIBLE});
       expect(result).toEqual(initialState);
    })

    it('Установка типа', () => {
        const result = modal(initialState, {type: types.SET_TYPE, typeModal: "order"});
        expect(result).toEqual({
            ...initialState,
            typeModal: 'order',
        })
    })

    it('Удаление типа', () => {
        const result = modal(initialState, {type: types.DELETE_TYPE});
        expect(result).toEqual(initialState);
    })
})
