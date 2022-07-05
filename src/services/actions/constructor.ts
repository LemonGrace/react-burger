import {createOrder} from "../../utils/api";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    ADD_INGREDIENT, DELETE_INGREDIENT, DELETE_ORDER, REPLACE_BUN, REORDER, DEFAULT
} from "../constants/order-constructor"
import {IIngredient, IOrderItem} from "../../utils/type";
import {AppDispatch, AppThunk} from "../../index";

/** Настройка заказа */
export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly item: IIngredient;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
    readonly order: number;
}

export interface IDeleteOrderAction {
    readonly type: typeof DELETE_ORDER;
}

export interface IReplaceBunAction {
    readonly type: typeof REPLACE_BUN;
    readonly item: IIngredient;
}

export interface IReorderAction {
    readonly type: typeof REORDER;
    readonly from: number;
    readonly to: number;
}

export interface IDefaultAction {
    readonly type: typeof DEFAULT;
}

/** Создание заказа */
export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly order: number
}

export interface ICreateOrderErrorAction {
    readonly type: typeof CREATE_ORDER_ERROR;
}

export type TConstructorActions =
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderErrorAction
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IDeleteOrderAction
    | IReplaceBunAction
    | IReorderAction
    | IDefaultAction;

export const getOrder: AppThunk = (data: Array<IOrderItem>) => (dispatch: AppDispatch) => {
    dispatch({
        type: CREATE_ORDER_REQUEST
    });
    createOrder(data).then(res => {
        if (res instanceof Error) {
            return;
        }
        if (res && res.success) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                order: res.order.number
            });
        } else {
            dispatch({
                type: CREATE_ORDER_ERROR
            });
        }
    }).catch(e => {
        dispatch({
            type: CREATE_ORDER_ERROR
        });
    });
}
