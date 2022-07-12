import {getBurgerData} from "../../utils/api";
import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from '../constants/ingredients'
import {IIngredient} from "../../utils/type";
import {AppDispatch, AppThunk} from "../../index";

export interface IIngredientsRequestAction {
    readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccessAction {
    readonly type: typeof INGREDIENTS_SUCCESS;
    readonly items: Array<IIngredient>
}

export interface IIngredientsErrorAction {
    readonly type: typeof INGREDIENTS_ERROR;
}

export type TIngredientsActions =
    | IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsErrorAction;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: INGREDIENTS_REQUEST
    });
    getBurgerData().then(res => {
        if (res instanceof Error) {
            return;
        }
        if (res && res.success) {
            dispatch({
                type: INGREDIENTS_SUCCESS,
                items: res.data
            });
        } else {
            dispatch({
                type: INGREDIENTS_ERROR
            });
        }
    }).catch(e => {
        dispatch({
            type: INGREDIENTS_ERROR
        });
    });
}
