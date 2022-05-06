import React, {useMemo, useRef} from "react";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useSelector, useDispatch  } from 'react-redux';
import {SET_INGREDIENT} from "../../services/actions/details";
import { SET_TYPE, SET_VISIBLE } from "../../services/actions/modal";
import {Ingredient} from "../../utils/type";
import {useDrag} from "react-dnd";

const DraggableCard = ({item}) => {
    const dispatch = useDispatch();
    /** Получение данных о выбранных ингредиентах и подсчет их количества*/
    const content = useSelector(state => state.order.content);
    const count = useMemo(() => {
        const unique = [];
        content.map((data) => {
            if (!unique.find(value => data.ingredient._id === value.item._id)) {
                unique.push({item: data.ingredient, count: content
                        .filter(item => item.ingredient._id === data.ingredient._id).length});
            }
            return data;
        });
        return unique;
    }, [content]);

    const [, dragRef] = useDrag({
        type: "ingredients",
        item: item,
    });
    return (
        <div className={clsx(styles.ingredientsSectionContainer, "mt-6")}
             onClick={() => {
                 dispatch({type: SET_INGREDIENT, item});
                 dispatch({type: SET_VISIBLE});
                 dispatch({type: SET_TYPE, modalType: "details"});
             }} ref={dragRef}>
            {
                count.find(value => item._id === value.item._id) &&
                <Counter count={count.find(value => item.name === value.item.name).count} size="default" />
            }
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
}

const IngredientsSection = React.forwardRef((props, ref) => {
    return (
        <>
            <h2 className={clsx(styles.ingredientsSectionCaption, "text_type_main-medium")} ref={ref}>
                {props.caption}
            </h2>
            <section className={clsx(styles.ingredientsSectionWrapper, 'mb-10 mr-2 ml-4')}>
                {props.ingredients.map ((item) => {
                    return (
                        <DraggableCard key={item._id} item={item} />
                    )
                })}
            </section>
        </>
    )
})


function WrappedComponent() {
    const burgerData = useSelector(state => state.burgerIngredient.ingredients);
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

    /** Получение статуса видимости модалки */
    const {isVisible, type} = useSelector(state => state.modal);

    /** Табло навигации */
    const [current, setCurrent] = React.useState('bun');
    /** Изменение активной секции */
    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);
    const scrollPosition = (e) => {
        // Сеттим булочку, только есть разница меньше чем с соусами
        if (Math.abs(e.target.scrollTop - refBun.current.offsetTop)
            < Math.abs(e.target.scrollTop - refSauce.current.offsetTop)) {
            setCurrent('bun');
        }
        // Сеттим соусы если разница меньше чем с булочкой и начинками
        if ((Math.abs(e.target.scrollTop - refBun.current.offsetTop)
            > Math.abs(e.target.scrollTop - refSauce.current.offsetTop))
            && (Math.abs(e.target.scrollTop - refSauce.current.offsetTop)
                < Math.abs(e.target.scrollTop - refMain.current.offsetTop))) {
            setCurrent('sauce');
        }
        // Сеттим начинки, только есть разница меньше чем с соусами
        if (Math.abs(e.target.scrollTop - refMain.current.offsetTop)
            < Math.abs(e.target.scrollTop - refSauce.current.offsetTop)) {
            setCurrent('main');
        }
    }

    const TabChoose = () => {
        return (
            <div className={clsx(styles.tab, "mb-10")}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        )
    }

    return (
        <section className={clsx(styles.section, "mr-10")}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <TabChoose/>
            {isVisible && type === "details" &&
            <Modal caption={"Детали ингредиента"}>
                <IngredientDetails/>
            </Modal>
            }
            <div className={styles.menuContainer} onScroll={(event => {scrollPosition(event)})}>
                <IngredientsSection
                    ingredients={bunArray}
                    caption={"Булки"}
                    ref={refBun}
                />
                <IngredientsSection
                    ingredients={sauceArray}
                    caption={"Соусы"}
                    ref={refSauce}
                />
                <IngredientsSection
                    ingredients={mainArray}
                    caption={"Начинки"}
                    ref={refMain}
                />
            </div>
        </section>
    );
}
const BurgerIngredients = React.memo(WrappedComponent);
export default BurgerIngredients;

IngredientsSection.propTypes = {
    ingredients: PropTypes.arrayOf(Ingredient.isRequired).isRequired,
    caption: PropTypes.string.isRequired,
}
