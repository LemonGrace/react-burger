import React from 'react';
import styles from './order-details.module.css'
import doneImagePath from '../../images/done.png';
import PropTypes from 'prop-types';
import clsx from "clsx";

function OrderDetails(props){
    return (
        <div className={styles.detailsContainer}>
            <p className={clsx("mb-4 mt-4 text_type_digits-large", styles.orderNumber)}>{props.orderNumber}</p>
            <p className={"text_type_main-medium mt-4 mb-15"}>идентификатор заказа</p>
            <img src={doneImagePath} alt={"done"}/>
            <p className={"text_type_main-default mt-15 mb-1"}>Ваш заказ начали готовить</p>
            <p className={"text_type_main-default text_color_inactive mt-1 mb-30"}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}
export default OrderDetails;
OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}
