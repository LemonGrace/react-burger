import React, {FC, useMemo, useRef} from "react";
import styles from './burger-constructor.module.css';
import clsx from "clsx";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../services/actions/modal";
import {DELETE_INGREDIENT} from "../../services/actions/details";
import {useDrag, useDrop} from "react-dnd";
import {ADD_INGREDIENT, DEFAULT, REORDER, REPLACE_BUN} from "../../services/actions/constructor";
import { useHistory } from 'react-router-dom';
import {IIngredient, IOrderItem} from "../../utils/type";
import {History} from "history";

interface IDragItem {
    item: IOrderItem
}

/** Карточка отдельного инг. для реализации dnd */
const DraggableCard: FC<IDragItem> = ({item}) => {
    const dispatch: any = useDispatch();
    const ref = useRef<HTMLDivElement>(null)
    /** Обработка перетаскивания карточки */
    const [, dragRef] = useDrag({
        type: "constructor",
        item: item,
    });
    let hoverIndex: number;
    const [, dropTarget] = useDrop({
        accept: "constructor",
        drop(itemDrag: IOrderItem) {
            dispatch({type: REORDER, from: itemDrag.order, to: hoverIndex});
        },
        hover(itemDrag) {
            hoverIndex = item.order;
        }
    });
    dragRef(dropTarget(ref));
    const handleClose = (): void => {
        dispatch({type: DELETE_INGREDIENT, id: item.ingredient._id, order: item.order})
    }
    return (
        <div className={clsx(styles.container, "mr-2 ml-4 mt-4")}>
            <DragIcon type="primary" />
            <div className={clsx(styles.itemCard, "ml-2")} ref={ref}>
                <ConstructorElement
                    text={item.ingredient.name}
                    price={item.ingredient.price}
                    thumbnail={item.ingredient.image}
                    handleClose={handleClose}
                />
            </div>
        </div>
    )
}

function BurgerConstructor() {
    const content: Array<IOrderItem> = useSelector(state => (state as any).order.content);
    /** Получение булочки*/
    const bun: IOrderItem = useMemo(() => {
        return content.filter(item => item.ingredient.type === "bun")[0];
    }, [content]);

    /** Получение массива ингредиентов без булочек*/
    const ingredients: Array<IOrderItem> = useMemo(() => {
        return content.filter(item => item.ingredient.type !== "bun");
    }, [content]);

    /** Вычисление итоговой стоимости заказа*/
    const finalCost: number = useMemo(() => {
        if (bun && ingredients) {
            return ingredients.reduce(function (prev, next) {
                return prev + next.ingredient.price;
            }, 0) + 2 * bun.ingredient.price;
        } else if (bun) {
            return 2 * bun.ingredient.price;
        } else {
            return 0;
        }
    }, [ingredients, bun])

    /** Работа со статусом заказа и модальным окном */
    const dispatch: any = useDispatch();
    /** Получение статуса видимости модалки */
    const {isVisible}: {isVisible: boolean} = useSelector(state => (state as any).modal);
    /** Создание уникальных ключей */
    function uID(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }


    /** Секция с выбранными ингредиентами */
    const IngredientSection = useMemo(() => {
        return (
            <div className={clsx(styles.menuContainer)}>
                {ingredients.sort((a, b) => a.order - b.order).map((item) => {
                    return (
                        <DraggableCard key={uID()} item={item}/>
                    )
                })}
            </div>
        );
    }, [ingredients]);

    /** Обработка броска карточки */
    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item: IIngredient){
            item.type === "bun" ? dispatch({type: REPLACE_BUN, item: item})
                : content.length >= 2 ? dispatch({type: ADD_INGREDIENT, item: item}) : dispatch({type: DEFAULT});
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    /**Реализация переадресации, если нет данных об авторизации*/
    const history: History = useHistory();
    const {isAuth}: {isAuth: boolean} = useSelector(state => (state as any).user);

    /** Подсветка области, если мало или вообще нет элементов в заказе */
    const needShowDrop: string = content.length < 3 ? isHover ? styles.canDrop : "" : "";

    const handleClick = (): void => {
        if (isAuth) {
            dispatch(openModal(content));
        } else {
            history.push("/login");
        }
    }
    return (
        <section className={clsx(styles.section, "mt-25", needShowDrop)} ref={dropTarget}>
            {content && bun &&
            <div className={"mr-4 ml-4 pl-8"}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.ingredient.name + " (верх)"}
                    price={bun.ingredient.price}
                    thumbnail={bun.ingredient.image}
                />
            </div>
            }
            {IngredientSection}
            {content && bun &&
            <div className={"mr-4 ml-4 mt-4 pl-8"}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.ingredient.name + " (низ)"}
                    price={bun.ingredient.price}
                    thumbnail={bun.ingredient.image}
                />
            </div>
            }
            {isVisible &&
            <Modal caption={""}>
                <OrderDetails/>
            </Modal>}
            <div className={clsx("mt-10 mr-4 mb-10", styles.finalContainer, styles.container)}>
                <div className={styles.container}>
                    <span className={clsx("mr-5 text_type_digits-default", styles.container)}>
                        <span className="pr-2">{finalCost}</span>
                        <CurrencyIcon type="primary"/>
                    </span>
                </div>
                <Button type="primary" size="medium" disabled={content.length < 1} onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default React.memo(BurgerConstructor);

