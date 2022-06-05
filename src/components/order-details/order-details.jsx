import React from 'react';
import styles from './order-details.module.css'
import doneImagePath from '../../images/done.png';
import clsx from "clsx";
import { useSelector } from 'react-redux';

function OrderDetails(){
    const order = useSelector(state => state.order.order);
    return (
        <div className={styles.detailsContainer}>
            <p className={clsx("mb-4 mt-4 text_type_digits-large", styles.orderNumber)}>{order}</p>
            <p className={"text_type_main-medium mt-4 mb-15"}>идентификатор заказа</p>
            <img src={doneImagePath} alt={"done"}/>
            <p className={"text_type_main-default mt-15 mb-1"}>Ваш заказ начали готовить</p>
            <p className={"text_type_main-default text_color_inactive mt-1 mb-30"}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}
export default OrderDetails;
