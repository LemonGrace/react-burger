import React from "react";
import clsx from "clsx";
import {useDispatch, useSelector} from "../../utils/hooks";
import Loading from "../loading/loading";
import Error from "../error/error";
import {useParams} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getOrderInfoDetails} from "../../services/actions/feed";
import styles from './order-info-details.module.css'
import {IIngredient} from "../../utils/type";
import { IIngredientCard } from "../burger-ingredients/burger-ingredients";
import * as uuid from "uuid";

function OrderInfoDetails() {
    /** Получение списка всех заказов и данных об ингредиентах*/
    const {ingredients, isIngredientsLoading, isIngredientsFailed} = useSelector(state => state.burgerIngredient);
    const {orderSelected} = useSelector(state => state.feed)
    const {id}: { id: string } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getOrderInfoDetails(id))
    }, [dispatch, id])
    let sum = 0;
    let allIngredientsInOrder: Array<IIngredient> = [];
    let uniqueIngredientsInOrder: Array<IIngredientCard> = [];
    if (orderSelected) {
        orderSelected.ingredients.map((item) => {
            const ingredient = ingredients.find(ingredient => ingredient._id === item);
            if (ingredient) {
                allIngredientsInOrder.push(ingredient);
                sum += ingredient.price;
            }
            return ingredient;
        });

    }
    allIngredientsInOrder.map((data) => {
        if (!uniqueIngredientsInOrder.find(value => data._id === value.item._id)) {
            uniqueIngredientsInOrder.push({item: data, count: allIngredientsInOrder
                    .filter(item => item._id === data._id).length});
        }
        return data;
    });
    if (!orderSelected) {
        return (<Loading/>);
    }
    let status: string = '';
    switch (orderSelected.status) {
        case "created": {
            status = 'Создан';
            break;
        }
        case "done": {
            status = 'Выполнен';
            break;
        }
        case "pending": {
            status = 'Готовится';
            break;
        }
    }

    if (isIngredientsLoading || ingredients.length < 1) {
        return (<Loading/>);
    }
    if (isIngredientsFailed) {
        return (<Error/>);
    }

    return (
        <div className={clsx("pl-6 pr-6 pb-6 mt-10")}>
            <p className="text text_type_main-medium mb-3">{orderSelected.name}</p>
            <p className={clsx("text text_type_main-default mb-15",
                orderSelected.status === "done" && styles.statusColor)}>{status}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={clsx(styles.ingredientInfoContainerWrapper, "mb-10")} >
                {
                    uniqueIngredientsInOrder.map((ingredient) => {
                        return (
                            <div key={uuid.v4()} className={clsx(styles.ingredientInfoContainer, "mb-4")}>
                                <div className={styles.infoSum}>
                                    <div className={styles.ingredientImageWrapper}>
                                        <img src={ingredient.item.image_mobile}
                                             className={styles.ingredientImage}
                                             alt={"Картинка"}
                                        />
                                    </div>
                                    <p className={"text text_type_main-default ml-4"}>
                                        {ingredient.item.name}
                                    </p>
                                </div>
                                <div className={styles.infoSum}>
                                    <p className={clsx(styles.infoSum, "ml-4 mr-6")}>
                                        <span className={"text text_type_digits-default mr-2"}>
                                            {ingredient.count} X {ingredient.item.price}
                                        </span>
                                        <CurrencyIcon type={"primary"}/>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
            </div>

            <div className={styles.infoCreateAnsSum}>
                <p className="text text_type_main-default text_color_inactive">{orderSelected.createdAt}</p>
                <p className={clsx(styles.infoSum, "text text_type_digits-default")}>
                    <span className={"mr-2"}>{sum}</span>
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    )
}

export default OrderInfoDetails;