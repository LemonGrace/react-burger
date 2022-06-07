import React, {useCallback, useState} from "react";
import {deleteCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import clsx from "clsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css'
import {resetPassword} from "../../services/actions/auth";
import Loading from "../../components/loading/loading";

function PasswordResetPage() {

    /** Форма для отправки на бэк */
    const [form, setValue] = useState({ password: '', token: ''});

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const {isRequestLoading, isRequestFailed, isPasswordReset} = useSelector(state => state.resetPassword);
    const canGoToNextStep = !isRequestLoading && !isRequestFailed && isPasswordReset;
    const history = useHistory();

    /** Установка нового пароля */
    const dispatch = useDispatch();
    const reset = useCallback(
        e => {
            e.preventDefault();
            deleteCookie('emailResetSend');
            dispatch(resetPassword(form));
        },
        [form, dispatch]
    );

    React.useEffect(() => {
        if (canGoToNextStep) {
            history.replace({
                pathname: "/login",
            });
        }
    }, [history, canGoToNextStep])

    /** Получение данных о возможности доступа */
    const location = useLocation();
    if (!location.state && !location.state.emailHasChecked) {
        return (
            <Redirect to={"/"}/>
        )
    }
    // TODO: в свободное время добавить обработку ошибки
    if (isRequestLoading) {
        return (<Loading/>)
    }

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

}
export default React.memo(PasswordResetPage);
