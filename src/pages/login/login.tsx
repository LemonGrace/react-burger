import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import clsx from "clsx";
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {enter} from "../../services/actions/auth";

export interface ILoginFields {
    email: string;
    password: string;
}

function LoginPage() {

    /** Форма для отправки на бэк */
    const initialState: ILoginFields = {
        email: '',
        password: ''
    }
    const [form, setValue] = useState<ILoginFields>(initialState);
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    /** Авторизация пользователя */
    const dispatch: any = useDispatch();
    const login = useCallback(
        (e: React.SyntheticEvent): void => {
            e.preventDefault();
            dispatch(enter(form));
        },
        [form, dispatch]
    );

    return (
        <form className={styles.wrapper} onSubmit={login}>
            <h1 className={clsx(styles.header, "mb-6 text_type_main-medium")}>Вход</h1>
            <div className={"mb-6"}>
                <EmailInput onChange={onChange} value={form.email} name={'email'}/>
            </div>
            <div className={"mb-6"}>
                <PasswordInput name={'password'} value={form.password} onChange={onChange}/>
            </div>
            <div className={"mb-20"}>
                <Button type="primary" size="medium" htmlType={"submit"}>
                    Войти
                </Button>
            </div>
            <p className={clsx(styles.text, "text_type_main-default text_color_inactive", "pb-4")}>
                Вы новый пользователь? <Link to={"/register"} className={styles.link}> Зарегистрироваться </Link>
            </p>
            <p className={clsx(styles.text, "text_type_main-default text_color_inactive")}>
                Забыли пароль? <Link to={"/forgot-password"} className={styles.link}> Восстановить пароль </Link>
            </p>
        </form>
    )
}

export default React.memo(LoginPage);
