import React from 'react';
import Modal from "../modal/modal";
import styles from './order-details.module.css'
import PropTypes from 'prop-types';
import orderNumberImagePath from '../../images/ordernumber.png'
import doneImagePath from '../../images/done.png'

function OrderDetails(props){
    return (
        <Modal onClick={props.onClick} caption={""}>
            <div className={styles.detailsContainer}>
                <img src={orderNumberImagePath} className={"mt-4"} alt={"Идентификатор заказа"}/>
                <p className={"text_type_main-medium mt-8 mb-15"}>идентификатор заказа</p>
                <img src={doneImagePath} alt={"done"}/>
                <p className={"text_type_main-default mt-15 mb-1"}>Ваш заказ начали готовить</p>
                <p className={"text_type_main-default text_color_inactive mt-1 mb-30"}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
}
export default OrderDetails;

OrderDetails.propTypes = {
    onClick: PropTypes.func.isRequired
}
