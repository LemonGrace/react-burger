import React, {FC, Fragment} from "react";
import {IOrderFeed} from "../../utils/type";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-info.module.css'
import clsx from "clsx";
import {useSelector} from "../../utils/hooks";
import * as uuid from "uuid";
import {History, Location} from "history";
import {useHistory, useLocation} from "react-router-dom";

const OrderInfoCard: FC<{order: IOrderFeed, IsShowStatus: boolean}> = ({order, IsShowStatus}) => {

    const ingredients = useSelector(state => state.burgerIngredient.ingredients);
    let orderReverse = [...order.ingredients];
    let ingredientsLeft = 0
    if (orderReverse.length > 5) {
        orderReverse = orderReverse.slice(0, 5);
        ingredientsLeft = order.ingredients.length - 5
    }
    orderReverse = orderReverse.reverse();
    let sum = 0;
    let status: string = '';
    switch (order.status) {
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

    /** Модальное окно */
    const history: History = useHistory();
    const location: Location = useLocation();
    const handleClick = (): void => {
        history.push({
            pathname: IsShowStatus ? `/profile/${order.number}` : `/feed/${order.number}`,
            state: { background: location },
        });
    }

    return (
        <div className={clsx(styles.card, "p-6")} onClick={handleClick}>
            <div className={clsx(styles.cardInfo, "mb-6")}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
            </div>
            <p className={clsx("text text_type_main-medium mb-2", !IsShowStatus && "mb-6")}>
                {order.name}
            </p>
            {IsShowStatus &&
                <p className={clsx("text text_type_main-default mb-6",
                    order.status === "done" && styles.statusDone)}>
                    {status}
                </p>}
            <div className={styles.ingredientsWrapper}>
                <div className={styles.ingredientsImageRowContainer}>
                    {orderReverse.map((item, index) => {
                        let ingredientInOrder = ingredients.find(ingredient => ingredient._id === item);
                        let scr;
                        if (!ingredientInOrder) {
                            scr = "https://code.s3.yandex.net/react/code/sauce-03-mobile.png";
                        } else {
                            sum += ingredientInOrder.type === "bun" ?
                                ingredientInOrder.price*2 : ingredientInOrder.price;
                            scr = ingredientInOrder.image_mobile;
                        }
                        return (
                            <Fragment key={uuid.v4()}>
                                <div className={clsx(styles.ingredientImageWrapper,
                                    styles.ingredientTransformImageWrapper,
                                    (ingredientsLeft > 0 && index === 0) && styles.ingredientImageFirstCounter)}
                                >
                                    <img src={scr} className={clsx(styles.ingredientImage)}
                                         alt={"Изображение"} />
                                </div>
                                {ingredientsLeft > 0 && index === 0 &&
                                    <div className={clsx(styles.ingredientsLeftCounter, "text_type_digits-default")}>
                                        +{ingredientsLeft}
                                    </div>
                                }
                            </Fragment>

                        )
                    })}
                </div>
                <div className={styles.ingredientsInfoWrapper}>
                    <p className="text text_type_digits-default">{sum}</p> <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}
export default OrderInfoCard;