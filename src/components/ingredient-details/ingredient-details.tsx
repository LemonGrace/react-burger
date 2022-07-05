import React from 'react';
import styles from './ingredient-details.module.css'
import clsx from "clsx";
import {useSelector} from "../../utils/hooks";
import {useParams} from "react-router-dom";
import Loading from "../loading/loading";
import Error from "../error/error";

function IngredientDetails() {
    const {ingredients, isIngredientsLoading, isIngredientsFailed} = useSelector(state => state.burgerIngredient);

    const {id}: {id: string} = useParams<{id: string}>();

    if (isIngredientsLoading || ingredients.length < 1) {
        return (<Loading/>);
    }
    if (isIngredientsFailed) {
        return (<Error/>);
    }

    const ingredientSelected = ingredients.find(item => item._id === id);
    if (!ingredientSelected) {
        return (<div/>);
    }
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

