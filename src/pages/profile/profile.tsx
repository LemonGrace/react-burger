import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "../../utils/hooks";
import {getUser, updateInfo} from "../../services/actions/auth";
import ProfileNav from "../../components/profile-nav/profile-nav";
import styles from "./profile.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {useRouteMatch} from "react-router-dom";
import OrderInfoCard from "../../components/order-info/order-info";
import * as uuid from "uuid";
import {WS_CONNECTION_START} from "../../services/constants/webSocket";
import Loading from "../../components/loading/loading";

export interface IUserInfo {
    name: string;
    email: string;
    password: string;
}

const ProfileData = () => {
    /** Получение и сохранение данных о пользователе*/
    const dispatch = useDispatch();
    const {username, email, isAuth, isUserLoading} = useSelector(state => state.user);

    if (!username && !email && isAuth) {
        if (!isUserLoading) dispatch(getUser());
    }

    /** Инициализация формы*/
    const initialState: IUserInfo = {
        name: username,
        email: email,
        password: "",
    }
    const [form, setValue] = React.useState<IUserInfo>(initialState);
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    /** Возвращение к исходному состоянию */
    const resetForm = (): void => {
        setValue(initialState);
    }
    /** Обновление данных */
    const update = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(updateInfo(form));
        },
        [form, dispatch]
    );
    return (
        <form className={clsx("ml-15")} onSubmit={update}>
            <div className={"mb-6"}>
                <Input value={form.name} onChange={onChange} name={"name"} placeholder={"Имя"}
                       icon={'EditIcon'}/>
            </div>
            <div className={"mb-6"}>
                <Input value={form.email} onChange={onChange} name={"email"} placeholder={"Логин"}
                       icon={'EditIcon'}/>
            </div>
            <div className={"mb-6"}>
                <Input value={form.password} onChange={onChange} name={"password"}
                       placeholder={"Пароль"}
                       icon={'EditIcon'}/>
            </div>
            <div className={styles.submitContainer}>
                <p className={clsx("mr-7  text_type_main-small", styles.cancel)} onClick={resetForm}>
                    Отмена
                </p>
                <Button type="primary" size="medium" htmlType={"submit"}> Сохранить </Button>
            </div>
        </form>
    )
}

const ProfileOrders = () => {
    const {orders} = useSelector(state => state.feed);
    if (orders.length === 0) {
        return (<Loading/>);
    }
    return (
        <div className={clsx(styles.feedPageOrdersWrapper, "pr-2 ml-15")}>
            {orders.map((order) => {
                return <OrderInfoCard key={uuid.v4()} order={order} IsShowStatus={true}/>
            })}
        </div>
    )
}

function ProfilePage() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, IsPersonal: true });
    }, [dispatch])
    const isFeedOrders: boolean = !!useRouteMatch("/profile/orders");
    const innerText = isFeedOrders ?
        `В этом разделе вы можете просмотреть свою историю заказов`
        : `В этом разделе вы можете изменить свои персональные данные`;
    return (
        <main className={clsx(styles.wrapper, "mt-30")}>
            <section className={styles.sectionWrapper}>
                <ProfileNav/>
                <div className={"mt-20 text_type_main-small text_color_inactive"}>
                    {innerText}
                </div>
            </section>
            {!isFeedOrders && <ProfileData/>}
            {isFeedOrders && <ProfileOrders/>}
        </main>
    )
}

export default React.memo(ProfilePage);
