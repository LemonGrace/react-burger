import React from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {Button, CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
//{!props.isBun && <DragIcon type="primary" />}

const Item = (props) => {
    return (
            <div className={clsx(styles.itemCard, "mb-4 pb-4 pt-4 pr-8 mr-2 ml-4")}>
                <div className={clsx(styles.container, {["pl-6"] : props.isBun})}>
                    <div className={styles.container}>
                        {!props.isBun && <DragIcon type="primary" />}
                        <div className={"mr-5 ml-8 pl-6"}>
                            <img src={props.ingredient.image_large} alt="Ингредиент"
                                 className={clsx(styles.itemCardImage,
                                     {[styles.itemCardImageBottom] : !props.isUp && props.isBun})}/>
                        </div>
                    </div>
                    <span className={"mr-5 text_type_main-default"}>{props.ingredient.name}</span>
                </div>
                <div className={styles.container}>
                    <span className={clsx("mr-5 text_type_digits-default", styles.itemCardP)}>
                        <span className="pr-2">{props.ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </span>
                    {props.isBun && <LockIcon type="secondary"/>}
                    {!props.isBun && <DeleteIcon type="primary"/>}
                </div>
            </div>
    )
}

function BurgerConstructor(props) {
    console.log(props);
    const bun = props.data.filter(item => item.type === "bun")[1];
    /** TODO:Настроить отработку поиска выбранных товаров*/
    const finalCost = props.data.reduce(function (prev,next) {
        return prev + next.price;
    },0);

    return (
        <section className={clsx(styles.section, "mt-25")}>
            <div className={styles.menuContainer}>
                <Item ingredient={bun} isBun={true} isUp={true}/>
                {props.data.filter(item => item.type !== "bun").map((item, index) => {
                    return (
                        <Item key={index} ingredient={item} isBun={false}/>
                    )
                })}
                <Item ingredient={bun} isBun={true} isUp={false}/>
            </div>
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
    ingredient: PropTypes.shape ({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }),
    isBun: PropTypes.bool,
    isUp: PropTypes.bool,
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape ({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }))
}

