import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from '../../constants/ingredients';
import {TIngredientsActions} from "../../actions/ingredients";
import { IIngredient } from '../../../utils/type';

/** редьюсер для загрузки данных */
type TIngredients = {
    ingredients: Array<IIngredient>,
    isIngredientsLoading: boolean,
    isIngredientsFailed: boolean,
};
const initialState: TIngredients = {
    ingredients: [],
    isIngredientsLoading: false,
    isIngredientsFailed: false,
}
export const burgerIngredient = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                isIngredientsLoading: true
            };
        }
        case INGREDIENTS_SUCCESS: {
            return { ...state, isIngredientsFailed: false, ingredients: action.items, isIngredientsLoading: false };
        }
        case INGREDIENTS_ERROR: {
            return { ...state, isIngredientsFailed: true, isIngredientsLoading: false };
        }
        default: return state;
    }
}


