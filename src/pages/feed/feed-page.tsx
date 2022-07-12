import React, {FC} from "react";
import styles from './feed-page.module.css';
import clsx from "clsx";
import * as uuid from "uuid";
import {useDispatch, useSelector} from "../../utils/hooks";
import OrderInfoCard from "../../components/order-info/order-info";
import Loading from "../../components/loading/loading";
import {wsConnectionClosed, wsConnectionStart} from "../../services/actions/webSocket";
import {ordersBaseUrl} from "../../utils/baseUrl";

const FeedPage: FC<{}> = () => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(wsConnectionStart(ordersBaseUrl + `/all`));
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [dispatch])
    const {messages} = useSelector(state => state.wsReducer);
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
        return (<Loading/>);
    }
    const {orders, total, totalToday} = lastMessage;
    const pending = orders.filter(order => (order.status === 'pending' || order.status === 'created'));
    const ready =  orders.filter(order => order.status === 'done');

    const needBigContainerPending = pending.length > 9;
    const needBigContainerReady = ready.length > 9;

    if (orders.length === 0) {
        return (<Loading/>);
    }

    return (
        <div className={styles.feedPage}>
            <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
            <div className={clsx("mt-5", styles.feedPageContainer)}>
                <div className={clsx(styles.feedPageOrdersWrapper, "pr-2")}>
                    {
                        orders.map((order) => {
                        return <OrderInfoCard key={uuid.v4()} order={order} IsShowStatus={false}/>
                    })}
                </div>
                <div className={"ml-15"}>
                    <div className={clsx(styles.feedPageOrderStatusWrapper, "mb-15")}>
                        <div className={clsx("mr-9")}>
                            <p className={"text text_type_main-small mb-6"}>Готовы:</p>
                            <div className={clsx(styles.feedPageStatusContainer,
                                needBigContainerReady && styles.feedPageStatusContainerBig)}>
                                {
                                    ready.map((item) => {
                                    return (
                                        <p key={uuid.v4()}
                                           className={clsx(styles.orderNumber, "text text_type_digits-default mb-2")}>
                                            {item.number}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <p className={"text text_type_main-small mb-6"}>В работе:</p>
                            <div className={clsx(styles.feedPageStatusContainer,
                                needBigContainerPending && styles.feedPageStatusContainerBig)}>
                                {
                                    pending.map((item) => {
                                    return (
                                        <p key={uuid.v4()}
                                           className="text text_type_digits-default mb-2">
                                            {item.number}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <p className="text text_type_main-small mb-15">Выполнено за все время:<br/>
                        <span className={clsx(styles.numberColor, "text text_type_digits-large")}>{total}</span>
                    </p>
                    <p className="text text_type_main-small">Выполнено за сегодня:<br/>
                        <span className={clsx(styles.numberColor, "text text_type_digits-large")}>{totalToday}</span>
                    </p>

                </div>
            </div>
        </div>
    )
}
export default FeedPage;