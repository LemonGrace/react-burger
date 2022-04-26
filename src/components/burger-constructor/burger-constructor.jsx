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
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../utils/burgerContext";

function BurgerConstructor(props) {
    const burgerData = React.useContext(BurgerContext);
    const bun = burgerData.filter(item => item.type === "bun")[0];
    const finalCost = burgerData.filter(item => item.type !== "bun").reduce(function (prev,next) {
        return prev + next.price;
    },0) + 2*bun.price;
    const initialState = { sum: finalCost };
    function reducer(state, action, item) {
        switch (action.type) {
            case "add":
                return { sum: state.sum + item.price };
            case "delete":
                return { sum: state.sum - item.price};
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }
    const [state, dispatch] = React.useReducer(reducer, initialState, undefined);

    const [stateOrder, setState] = React.useState({
        order: null,
        loading: true,
        hasError: false
    })

    const createOrder = async () => {
        try {
            setState({...stateOrder, hasError: false, loading: true});
            const requestData = [];
            burgerData.filter(item => item.type !== "bun").map((item) => {return requestData.push(item._id)});
            requestData.push(bun._id);
            const url = "https://norma.nomoreparties.space/api/orders";
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify({ingredients: requestData})
            });
            if (!response.ok) {
                throw new Error("response is not ok");
            }
            const data = await response.json();
            if (data && data.success === true) {
                setState({...stateOrder, order: data.order.number, hasError: false, loading: false});
            } else {
                throw new Error("DataConfirmError");
            }
        }
        catch (e) {
            console.log(e)
            setState({...stateOrder, hasError: true, loading: false});
        }
    }

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
                {burgerData.filter(item => item.type !== "bun").map((item) => {
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
            {props.showModal && !stateOrder.hasError && !stateOrder.loading && stateOrder.order &&
            <Modal caption={""} onClick={props.closeModal}>
                <OrderDetails orderNumber={stateOrder.order}/>
            </Modal>}
            <div className={clsx("mt-10 mr-4 mb-10", styles.finalContainer, styles.container)}>
                <div className={styles.container}>
                    <span className={clsx("mr-5 text_type_digits-default", styles.container)}>
                        <span className="pr-2">{state.sum}</span>
                        <CurrencyIcon type="primary"/>
                    </span>
                </div>
                <Button type="primary" size="medium" onClick={async (event) => {
                    await createOrder();
                    props.openModal("constructor", event)
                }}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    showModal: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}
