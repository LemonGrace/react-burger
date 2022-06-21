import React, {ChangeEvent, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import styles from './forgot-password.module.css';
import clsx from "clsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {resetPasswordEmail} from "../../services/actions/auth";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import {History} from "history";

export interface IForgotPasswordFields {
    email: string;
}

function ForgotPasswordPage() {

    /** Получение данных об успешной отправки кода на email и переадресация */
    const {isRequestLoading, isRequestFailed, isEmailSend}:
        { isRequestLoading: boolean, isRequestFailed: boolean, isEmailSend: boolean }
        = useSelector(state => (state as any).resetPassword);
    const canGoToNextStep: boolean = !isRequestLoading && !isRequestFailed && isEmailSend;
    const history: History = useHistory();

    /** Форма для отправки на бэк */
    const initialState: IForgotPasswordFields = {
        email: ''
    }
    const [form, setValue] = useState<IForgotPasswordFields>(initialState);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    /** Отправка письма на почту */
    const dispatch: any = useDispatch();
    const reset = useCallback(
        (e: React.SyntheticEvent): void => {
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

    if (isRequestLoading) {
        return (<Loading/>)
    }
    if (isRequestFailed) {
        return (<Error/>);
    }

    return (
        <form className={styles.wrapper} onSubmit={reset}>
            <h1 className={clsx(styles.header, "mb-6 text_type_main-medium")}>Восстановление пароля</h1>
            <div className={"mb-6"}>
                <Input onChange={onChange} value={form.email} name={'email'} placeholder={"Укажите e-mail"}/>
            </div>
            <div className={"mb-20"}>
                <Button type="primary" size="medium" onClick={(form as unknown as HTMLFormElement).submit}>
                    Восстановить
                </Button>
            </div>
            <p className={clsx(styles.text, "text_type_main-default text_color_inactive")}>
                Вспомнили пароль? <Link to={"/login"} className={styles.link}> Войти </Link>
            </p>
        </form>
    );
}
export default React.memo(ForgotPasswordPage);
