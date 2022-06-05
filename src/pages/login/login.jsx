import React, {useCallback, useState} from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import clsx from "clsx";
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {enter} from "../../services/actions/auth";

function LoginPage() {
    const [form, setValue] = useState({email: '', password: ''});
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    /** Авторизация пользователя */
    const dispatch = useDispatch();
    const login = useCallback(
        e => {
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
                <Button type="primary" size="medium" onClick={form.submit}> Войти </Button>
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
