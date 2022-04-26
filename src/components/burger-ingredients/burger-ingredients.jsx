import React, {useMemo} from "react";
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
            <a href="/#bun" className={styles.navLink}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
            </a>
            <a href="#sauce" className={styles.navLink}>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
            </a>
            <a href="#main" className={styles.navLink}>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </a>
        </div>
    )
}

function IngredientsSectionWrappedComponent (props) {
    return (
        <>
            <h2 className={clsx(styles.ingredientsSectionCaption, "text_type_main-medium")} id={props.shortHref}>
                {props.caption}
            </h2>
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
const IngredientsSection = React.memo(IngredientsSectionWrappedComponent);

function WrappedComponent(props) {
    const burgerData = React.useContext(BurgerContext);

    /** Сохрание данных по разделам */
    const bunArray = useMemo(() => {
        return burgerData.filter(item => item.type === "bun");
    }, [burgerData]);
    const sauceArray = useMemo(() => {
        return burgerData.filter(item => item.type === "sauce");
    }, [burgerData]);
    const mainArray = useMemo(() => {
        return burgerData.filter(item => item.type === "main");
    }, [burgerData]);

    /** Сохрание ингредиента, по которому кликнули */
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
                    shortHref="bun"
                />
                <IngredientsSection
                    ingredients={sauceArray}
                    caption={"Соусы"}
                    openModal={props.openModal}
                    setData = {setIngredient}
                    shortHref="sauce"
                />
                <IngredientsSection
                    ingredients={mainArray}
                    caption={"Начинки"}
                    openModal={props.openModal}
                    setData = {setIngredient}
                    shortHref="main"
                />
            </div>

        </section>
    );
}
const BurgerIngredients = React.memo(WrappedComponent);
export default BurgerIngredients;

WrappedComponent.propTypes = {
    showModal: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

IngredientsSectionWrappedComponent.propTypes = {
    ingredients: PropTypes.arrayOf(Ingredient.isRequired).isRequired,
    caption: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    shortHref: PropTypes.string.isRequired,
}
