import React from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {Button, CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../utils/type";

const Item = (props) => {
    let itemCaption = props.ingredient.name;
    if (props.isBun) {
        itemCaption += props.isUp? " (верх)" : " (низ)";
    }
    return (
            <div className={clsx(styles.itemCardContainer, "mb-4 pb-4 pt-4 mr-2 ml-4", {"pr-8": props.isBun})}>
                <div>
                    {!props.isBun && <DragIcon type="primary" />}
                </div>
                <div className={clsx(styles.container, styles.itemCard, props.isBun&&props.isUp&&styles.itemCardBunUp,
                    props.isBun&&!props.isUp&&styles.itemCardBunDown, props.isBun&&"ml-6")}>
                    <div className={"mr-5 ml-8 pl-6"}>
                        <img src={props.ingredient.image_large} alt="Ингредиент"
                             className={clsx(styles.itemCardImage,
                                 {[styles.itemCardImageBottom]: !props.isUp && props.isBun})}/>
                    </div>
                    <span className={clsx(styles.itemCardCaption, "mr-5 text_type_main-default")}>{itemCaption}</span>
                    <div className={clsx(styles.container, "mr-8")}>
                        <span className={clsx("mr-5 text_type_digits-default", styles.itemCardP)}>
                            <span className="pr-2">{props.ingredient.price}</span>
                            <CurrencyIcon type="primary"/>
                        </span>
                        {props.isBun && <LockIcon type="secondary"/>}
                        {!props.isBun && <DeleteIcon type="primary"/>}
                    </div>
                </div>
            </div>
    )
}

function BurgerConstructor(props) {
    const bun = props.data.filter(item => item.type === "bun")[1];
    /** TODO:Настроить отработку поиска выбранных товаров*/
    const finalCost = props.data.reduce(function (prev,next) {
        return prev + next.price;
    },0);

    return (
        <section className={clsx(styles.section, "mt-25")}>
            <Item ingredient={bun} isBun={true} isUp={true}/>
            <div className={styles.menuContainer}>
                {props.data.filter(item => item.type !== "bun").map((item) => {
                    return (
                        <Item key={item._id} ingredient={item} isBun={false} isUp={false}/>
                    )
                })}
            </div>
            <Item ingredient={bun} isBun={true} isUp={false}/>
            <div className={clsx("mt-10 mr-4 mb-10", styles.finalContainer, styles.container)}>
                <div className={styles.container}>
                    <span className={clsx("mr-5 text_type_digits-default", styles.itemCardP)}>
                        <span className="pr-2">{finalCost}</span>
                        <CurrencyIcon type="primary"/>
                    </span>
                </div>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;

Item.propTypes = {
    ingredient: Ingredient.isRequired,
    isBun: PropTypes.bool.isRequired,
    isUp: PropTypes.bool.isRequired,
}

/** Необязатольно придет массив, если пользователь еще ничего не выбрал */
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(Ingredient.isRequired)
}

