import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateInfo} from "../../services/actions/auth";
import ProfileNav from "../../components/profile-nav/profile-nav";
import styles from "./profile.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";


const ProfileData = () => {
    /** Получение и сохранение данных о пользователе*/
    const dispatch = useDispatch();
    const {username, email, isAuth, isUserLoading} = useSelector(state => state.user);
    //
    if (!username && !email && isAuth) {
        if (!isUserLoading) dispatch(getUser());
    }

    const [form, setValue] = React.useState({name: username, email: email, password: ''});
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    /** Возвращение к исходному состоянию */
    const resetForm = () => {
        setValue({...form, name: username, email: email})
    }
    /** Обновление данных */
    const update = useCallback(
        e => {
            e.preventDefault();
            dispatch(updateInfo(form));
        },
        [form, dispatch]
    );
    return (
        <form className={clsx("ml-15")}>
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
                <Button type="primary" size="medium" onClick={update}> Сохранить </Button>
            </div>
        </form>
    )
}

function ProfilePage() {
    return (
        <main className={clsx(styles.wrapper, "mt-30")}>
            <section className={styles.sectionWrapper}>
                <ProfileNav/>
                <div className={"mt-20 text_type_main-small text_color_inactive"}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </section>
            <ProfileData/>
        </main>
    )
}

export default React.memo(ProfilePage);
