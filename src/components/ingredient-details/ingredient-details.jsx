import React from 'react';
import styles from './ingredient-details.module.css'
import clsx from "clsx";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import {getItems} from "../../services/actions/ingredients";

function IngredientDetails(){
    const {ingredients, itemsRequest, itemsFailed} = useSelector((state) => state.burgerIngredient);
    const { id } = useParams()
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch])
    if (itemsRequest || itemsFailed || ingredients.length < 1) {
        return null;
    } else {
        const item = ingredients.find(item => item._id === id);
        return (
            <div className={styles.detailsContainer}>
                <div>
                    <img src={item.image_large} alt="Изображение ингредиента"/>
                </div>
                <p className={"mt-4 mb-8 text_type_main-medium"}>
                    {item.name}
                </p>
                <div className={clsx("mb-15 text_color_inactive text_type_main-default", styles.caloriesInfoContainer)}>
                    <p className={styles.infoP}>
                        Калории,ккал<br/>
                        <span className={"text_type_digits-default"}>{item.calories}</span>
                    </p>
                    <p className={styles.infoP}>
                        Белки, г<br/>
                        <span className={"text_type_digits-default"}>{item.proteins}</span>
                    </p>
                    <p className={styles.infoP}>
                        Жиры, г<br/>
                        <span className={"text_type_digits-default"}>{item.fat}</span>
                    </p>
                    <p className={styles.infoP}>
                        Углеводы, г<br/>
                        <span className={"text_type_digits-default"}>{item.carbohydrates}</span>
                    </p>
                </div>
            </div>
        )
    }
}
export default IngredientDetails;

