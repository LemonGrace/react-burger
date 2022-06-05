import React from 'react';
import styles from './ingredient-details.module.css'
import clsx from "clsx";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import {getIngredients} from "../../services/actions/ingredients";

function IngredientDetails() {
    const {ingredients, isIngredientsLoading, isIngredientsFailed} = useSelector((state) => state.burgerIngredient);
    const {id} = useParams()
    const dispatch = useDispatch();
    /** Получение всех ингредиентов*/
    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])
    // TODO: сделать компонент лоудера!
    if (isIngredientsLoading || isIngredientsFailed || ingredients.length < 1) {
        return null;
    }
    const ingredientSelected = ingredients.find(item => item._id === id);
    return (
        <div className={styles.detailsContainer}>
            <div>
                <img src={ingredientSelected.image_large} alt="Изображение ингредиента"/>
            </div>
            <p className={"mt-4 mb-8 text_type_main-medium"}>
                {ingredientSelected.name}
            </p>
            <div className={clsx("mb-15 text_color_inactive text_type_main-default", styles.caloriesInfoContainer)}>
                <p className={styles.infoP}>
                    Калории,ккал<br/>
                    <span className={"text_type_digits-default"}>{ingredientSelected.calories}</span>
                </p>
                <p className={styles.infoP}>
                    Белки, г<br/>
                    <span className={"text_type_digits-default"}>{ingredientSelected.proteins}</span>
                </p>
                <p className={styles.infoP}>
                    Жиры, г<br/>
                    <span className={"text_type_digits-default"}>{ingredientSelected.fat}</span>
                </p>
                <p className={styles.infoP}>
                    Углеводы, г<br/>
                    <span className={"text_type_digits-default"}>{ingredientSelected.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

export default IngredientDetails;

