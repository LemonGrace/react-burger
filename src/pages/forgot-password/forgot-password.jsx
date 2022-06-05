import React, {useCallback, useState} from "react";
import {getCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import styles from './forgot-password.module.css';
import clsx from "clsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {resetPasswordEmail} from "../../services/actions/auth";

function ForgotPasswordPage() {

    /** Форма для отправки на бэк */
    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    /** Отправка письма на почту */
    const dispatch = useDispatch();
    const reset = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPasswordEmail(form));
        },
        [form, dispatch]
    );

    /** Получение данных об успешной отправки кода на email и переадресация */
    const {sendEmailRequest, sendEmailFailed, codeSuccessSend} = useSelector(state => state.resetPassword);
    const canGoToNextStep = !sendEmailRequest && !sendEmailFailed && codeSuccessSend;

    // TODO: в свободное время добавить обработку ошибки

    /** Получение данных об авторизации */
    const isAuth = !!getCookie('token');

    /** Если еще не подгрузились данные, но ничего не делать */
    const {loginRequest} = useSelector(state => state.login);
    if (loginRequest) {
        return null;
    }

    if(!isAuth && !canGoToNextStep) {
        return (
            <form className={styles.wrapper} onSubmit={reset}>
                <h1 className={clsx(styles.header, "mb-6 text_type_main-medium")}>Восстановление пароля</h1>
                <div className={"mb-6"}>
                    <Input onChange={onChange} value={form.email} name={'email'} placeholder={"Укажите e-mail"}/>
                </div>
                <div className={"mb-20"}>
                    <Button type="primary" size="medium" onClick={form.submit}> Восстановить </Button>
                </div>
                <p className={clsx(styles.text, "text_type_main-default text_color_inactive")}>
                    Вспомнили пароль? <Link to={"/login"} className={styles.link}> Войти </Link>
                </p>
            </form>
        );
    } else if (!isAuth && canGoToNextStep) {
        return (
            <Redirect
                to={{pathname: '/reset-password'}}
            />
        );
    } else {
        return (
            <Redirect
                to={{pathname: '/'}}
            />
        );
    }
}
export default React.memo(ForgotPasswordPage);
