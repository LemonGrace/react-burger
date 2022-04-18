import React from "react";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const TabChoose = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className="mb-10" style={{ display: 'flex' }}>
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
/** TODO: добавить модальные окна и выбор продукта*/
const IngredientsSection = (props) =>{
    return (
        <>
            <h1 className={clsx(styles.ingredientsSectionCaption, "text_type_main-medium")}>{props.caption}</h1>
            <section className={clsx(styles.ingredientsSectionWrapper, 'mb-10 mr-2 ml-4')}>
                {props.ingredients.map ((item, index) => {
                    return (
                        <div key={index}>
                            <img src={item.image} alt={"Карточка ингредиента"} className="pr-4 pl-4 pt-6"/>
                            <p className={clsx("text_type_digits-default m-1", styles.ingredientsSectionP,
                            styles.ingredientsSectionImage)}>
                                <span className="pr-2">{item.price}</span><CurrencyIcon type="primary" /></p>
                            <p className={clsx("text_type_main-default mt-1", styles.ingredientsSectionP)}>{item.name}</p>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

function BurgerIngredients(props) {
    const bunArray = props.data.filter(item => item.type === "bun");
    const sauceArray = props.data.filter(item => item.type === "sauce");
    const mainArray = props.data.filter(item => item.type === "main");

    return (
        <section className={clsx(styles.section, "mr-10")}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <TabChoose/>
            <div className={styles.menuContainer}>
                <IngredientsSection ingredients={bunArray} caption={"Булки"}/>
                <IngredientsSection ingredients={sauceArray} caption={"Соусы"}/>
                <IngredientsSection ingredients={mainArray} caption={"Начинки"}/>
            </div>

        </section>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
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

IngredientsSection.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape ({
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
    })),
    caption: PropTypes.string
}
