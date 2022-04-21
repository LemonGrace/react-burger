import React from 'react';
import Modal from "../modal/modal";
import styles from './ingredient-details.module.css'
import {Ingredient} from "../../utils/type";
import PropTypes from 'prop-types';
import clsx from "clsx";

function IngredientDetails(props){
    return (
        <Modal onClick={props.onClick} caption={"Детали ингредиента"}>
            <div className={styles.detailsContainer}>
                <div>
                    <img src={props.data.image_large} alt="Изображение ингредиента"/>
                </div>
                <p className={"mt-4 mb-8 text_type_main-medium"}>
                    {props.data.name}
                </p>
               <div className={clsx("mb-15 text_color_inactive text_type_main-default", styles.caloriesInfoContainer)}>
                   <p className={styles.infoP}>
                       Калории,ккал<br/>
                       <span className={"text_type_digits-default"}>{props.data.calories}</span>
                   </p>
                   <p className={styles.infoP}>
                       Белки, г<br/>
                       <span className={"text_type_digits-default"}>{props.data.proteins}</span>
                   </p>
                   <p className={styles.infoP}>
                       Жиры, г<br/>
                       <span className={"text_type_digits-default"}>{props.data.fat}</span>
                   </p>
                   <p className={styles.infoP}>
                       Углеводы, г<br/>
                       <span className={"text_type_digits-default"}>{props.data.carbohydrates}</span>
                   </p>
               </div>
            </div>
        </Modal>
    )
}
export default IngredientDetails;

IngredientDetails.propTypes = {
    data: Ingredient.isRequired,
    onClick: PropTypes.func.isRequired
}
