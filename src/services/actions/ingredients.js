import {getBurgerData} from "../../utils/api";

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: INGREDIENTS_REQUEST
        });
        getBurgerData().then(res => {
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
    };
}
