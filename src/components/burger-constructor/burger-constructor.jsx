import React from "react";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../utils/type";


function BurgerConstructor(props) {
    const bun = props.data.filter(item => item.type === "bun")[1];
    /** TODO:Настроить отработку поиска выбранных товаров*/
    const finalCost = props.data.reduce(function (prev,next) {
        return prev + next.price;
    },0);

    return (
        <section className={clsx(styles.section, "mt-25")}>
            <div className={"mr-4 ml-4 pl-8"}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name + " (верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={clsx(styles.menuContainer)}>
                {props.data.filter(item => item.type !== "bun").map((item) => {
                    return (
                        <div key={item._id} className={clsx(styles.container, "mr-2 ml-4 mt-4")}>
                            <DragIcon type="primary" />
                            <div className={clsx(styles.itemCard, "ml-2")}>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={"mr-4 ml-4 mt-4 pl-8"}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name + " (низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={clsx("mt-10 mr-4 mb-10", styles.finalContainer, styles.container)}>
                <div className={styles.container}>
                    <span className={clsx("mr-5 text_type_digits-default", styles.container)}>
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

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(Ingredient.isRequired).isRequired
}

