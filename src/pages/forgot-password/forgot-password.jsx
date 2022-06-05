import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import styles from './forgot-password.module.css';
import clsx from "clsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {resetPasswordEmail} from "../../services/actions/auth";
import Loading from "../../components/loading/loading";

function ForgotPasswordPage() {

    /** Получение данных об успешной отправки кода на email и переадресация */
    const {isRequestLoading, isRequestFailed, isEmailSend} = useSelector(state => state.resetPassword);
    const canGoToNextStep = !isRequestLoading && !isRequestFailed && isEmailSend;
    const history = useHistory();

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

    React.useEffect(() => {
        if (canGoToNextStep) {
            history.push({
                pathname: "/reset-password",
                state: {emailHasChecked: true},
            });
        }
    }, [history, canGoToNextStep])
    // TODO: в свободное время добавить обработку ошибки
    if (isRequestLoading) {
        return (<Loading/>)
    }

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
}
export default React.memo(ForgotPasswordPage);
