import React, {useCallback, useState} from "react";
import {deleteCookie, getCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import clsx from "clsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css'
import {resetPassword} from "../../services/actions/auth";

function PasswordResetPage() {

    /** Форма для отправки на бэк */
    const [form, setValue] = useState({ password: '', token: ''});

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    /** Получение данных об авторизации */
    const isAuth = !!getCookie('token');
    let hasAccess = !!getCookie('emailResetSend');
    React.useEffect(() => {
        //eslint-disable-next-line
        hasAccess = !!getCookie('emailResetSend');
    })

    const {resetPasswordFailed} = useSelector(state => state.resetPassword)
    // TODO: в свободное время добавить обработку ошибки

    /** Установка нового пароля */
    const dispatch = useDispatch();
    let reset = useCallback(
        e => {
            e.preventDefault();
            deleteCookie('emailResetSend');
            dispatch(resetPassword(form));
        },
        [form, dispatch]
    );

    /** Если еще не подгрузились данные, но ничего не делать */
    const {loginRequest} = useSelector(state => state.login);
    if (loginRequest) {
        return null;
    }

    if(!isAuth && hasAccess) {
        return (
            <form className={styles.wrapper} onSubmit={reset}>
                <h1 className={clsx(styles.header, "mb-6 text_type_main-medium")}>Восстановление пароля</h1>
                <div className={"mb-6"}>
                    <Input
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        placeholder={"Введите новый пароль"}
                        icon={'ShowIcon'}
                    />
                </div>
                <div className={"mb-6"}>
                    <Input onChange={onChange} value={form.token} name={'token'} placeholder={"Введите код из письма"}/>
                </div>
                <div className={"mb-20"}>
                    <Button type="primary" size="medium" onClick={form.submit}> Сохранить </Button>
                </div>
                <p className={clsx(styles.text, "text_type_main-default text_color_inactive")}>
                    Вспомнили пароль? <Link to={"/login"} className={styles.link}> Войти </Link>
                </p>
            </form>
        );
    } else {
        return (
            <Redirect
                to={{pathname: '/login'}}
            />
        );
    }

}
export default React.memo(PasswordResetPage);
