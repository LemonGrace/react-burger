import React from "react";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {Ingredient} from "../../utils/type";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../utils/burgerContext";

const TabChoose = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={clsx(styles.tab, "mb-10")}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

const IngredientsSection = (props) =>{
    return (
        <>
            <h2 className={clsx(styles.ingredientsSectionCaption, "text_type_main-medium")}>{props.caption}</h2>
            <section className={clsx(styles.ingredientsSectionWrapper, 'mb-10 mr-2 ml-4')}>
                {props.ingredients.map ((item) => {
                    return (
                        <div key={item._id} className={clsx(styles.ingredientsSectionContainer, "mt-6")}
                             onClick={(event) => {
                                 props.setData(item);
                                 props.openModal("details", event);
                             }}>
                            <Counter count={1} size="default" />
                            <img src={item.image} alt={"Карточка ингредиента"} className="pr-4 pl-4"/>
                            <p className={clsx("text_type_digits-default m-1", styles.ingredientsSectionP,
                            styles.ingredientsSectionImage)}>
                                <span className="pr-2">{item.price}</span><CurrencyIcon type="primary" />
                            </p>
                            <p className={clsx("text_type_main-default mt-1", styles.ingredientsSectionP)}>
                                {item.name}
                            </p>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

function BurgerIngredients(props) {
    const burgerData = React.useContext(BurgerContext);
    const bunArray = burgerData.filter(item => item.type === "bun");
    const sauceArray = burgerData.filter(item => item.type === "sauce");
    const mainArray = burgerData.filter(item => item.type === "main");
    const [ingredient, setIngredient] = React.useState({});

    return (
        <section className={clsx(styles.section, "mr-10")}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <TabChoose/>
            {props.showModal &&
            <Modal caption={"Детали ингредиента"} onClick={props.closeModal}>
                <IngredientDetails data={ingredient}/>
            </Modal>
            }
            <div className={styles.menuContainer}>
                <IngredientsSection
                    ingredients={bunArray}
                    caption={"Булки"}
                    openModal={props.openModal}
                    setData = {setIngredient}
                />
                <IngredientsSection
                    ingredients={sauceArray}
                    caption={"Соусы"}
                    openModal={props.openModal}
                    setData = {setIngredient}
                />
                <IngredientsSection
                    ingredients={mainArray}
                    caption={"Начинки"}
                    openModal={props.openModal}
                    setData = {setIngredient}
                />
            </div>

        </section>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    showModal: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

IngredientsSection.propTypes = {
    ingredients: PropTypes.arrayOf(Ingredient.isRequired).isRequired,
    caption: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired
}
