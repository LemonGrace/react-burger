import React, {FC, useMemo, useRef} from "react";
import styles from './burger-ingredients.module.css';
import clsx from "clsx";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector  } from 'react-redux';
import {IIngredient, IOrderItem} from "../../utils/type";
import {useDrag} from "react-dnd";
import {useHistory, useLocation} from "react-router-dom";
import {History, Location} from "history";

interface IIngredientCard {
    item: IIngredient,
    count: number
}

const DraggableCard: FC<{ item: IIngredient }> = ({item}) => {
    /** Получение данных о выбранных ингредиентах и подсчет их количества*/
    const content: Array<IOrderItem> = useSelector(state => (state as any).order.content);
    const count: Array<IIngredientCard> = useMemo(() => {
        const unique: Array<IIngredientCard> = [];
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
    const history: History = useHistory();
    const location: Location = useLocation();
    const handleClick = (): void => {
        history.push({
            pathname: `/ingredients/${item._id}`,
            state: { background: location },
        });
    }

    const countSelectedItem = (item: IIngredient): number => {
        const ingredientSelected: IIngredientCard | undefined = count.find(value => item.name === value.item.name);
        if (ingredientSelected) {
            return ingredientSelected.count;
        }
        return 0;
    }

    return (
        <div className={clsx(styles.ingredientsSectionContainer, "mt-6")}
             onClick={handleClick} ref={dragRef}>
            {
                count.find(value => item._id === value.item._id) &&
                <Counter count={countSelectedItem(item)} size="default" />
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

const IngredientsSection = React.forwardRef<HTMLDivElement, IIngredientsSection>
((props, ref) => {
    return (
        <>
            <h2 className={clsx(styles.ingredientsSectionCaption, "text_type_main-medium")} ref={ref}>
                {props.caption}
            </h2>
            <section className={clsx(styles.ingredientsSectionWrapper, 'mb-10 mr-2 ml-4')}>
                {props.ingredients.map((item) => {
                    return (
                        <DraggableCard key={item._id} item={item}/>
                    )
                })}
            </section>
        </>
    )
})


function BurgerIngredients() {
    const burgerData: Array<IIngredient> = useSelector(state => (state as any).burgerIngredient.ingredients);
    /** Сохрание данных по разделам */
    const bunArray: Array<IIngredient> = useMemo(() => {
        return burgerData.filter(item => item.type === "bun");
    }, [burgerData]);
    const sauceArray: Array<IIngredient> = useMemo(() => {
        return burgerData.filter(item => item.type === "sauce");
    }, [burgerData]);
    const mainArray: Array<IIngredient> = useMemo(() => {
        return burgerData.filter(item => item.type === "main");
    }, [burgerData]);

    /** Табло навигации */
    const [current, setCurrent] = React.useState('bun');
    /** Изменение активной секции */
    const refBun = useRef<HTMLDivElement>(null);
    const refSauce = useRef<HTMLDivElement>(null);
    const refMain = useRef<HTMLDivElement>(null);
    //TODO
    const scrollPosition = (e: any) => {
        console.log(typeof e)
        e.preventDefault();
        // Сеттим булочку, только есть разница меньше чем с соусами
        if (refBun.current && refSauce.current && refMain.current){
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
    }

    const scrollTo = (value: string): void => {
        setCurrent(value);
        switch (value) {
            case "bun": {
                if (refBun.current) {
                    refBun.current.scrollIntoView();
                }
                break;
            }
            case "sauce": {
                if (refSauce.current) {
                    refSauce.current.scrollIntoView();
                }
                break;
            }
            case "main": {
                if (refMain.current) {
                    refMain.current.scrollIntoView();
                }
                break;
            }
            default:
                break;
        }
    }


    const TabChoose = () => {
        return (
            <div className={clsx(styles.tab, "mb-10")}>
                <Tab value="bun" active={current === 'bun'} onClick={scrollTo}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={scrollTo}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={scrollTo}>
                    Начинки
                </Tab>
            </div>
        )
    }

    return (
        <section className={clsx(styles.section, "mr-10")}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <TabChoose/>
            <div className={styles.menuContainer} onScroll={scrollPosition}>
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
export default React.memo(BurgerIngredients);

interface IIngredientsSection {
    ingredients: Array<IIngredient>;
    caption: string
}
