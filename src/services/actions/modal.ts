import {getOrder} from "./constructor";
import {DELETE_TYPE, DELETE_VISIBLE, SET_TYPE, SET_VISIBLE} from '../constants/modal';
import {DELETE_ORDER} from "../constants/order-constructor";
import {AppDispatch, AppThunk} from "../../index";
import {IOrderItem} from "../../utils/type";

export interface ISetVisibleAction {
    readonly type: typeof SET_VISIBLE;
}

export interface IDeleteVisibleAction {
    readonly type: typeof DELETE_VISIBLE;
}
export interface ISetTypeAction {
    readonly type: typeof SET_TYPE;
    readonly typeModal: string;
}
export interface IDeleteTypeAction {
    readonly type: typeof DELETE_TYPE;
}

export type TModalAction =
    | ISetVisibleAction
    | IDeleteVisibleAction
    | ISetTypeAction
    | IDeleteTypeAction;


export const openModal: AppThunk = (content: Array<IOrderItem>) => (dispatch: AppDispatch | AppThunk) => {
    dispatch({type: SET_VISIBLE});
    dispatch({type: SET_TYPE, typeModal: `order`});
    dispatch(getOrder(content));
}

export const closeModal: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type: DELETE_VISIBLE});
    dispatch({type: DELETE_TYPE});
    dispatch({type: DELETE_ORDER});
}
