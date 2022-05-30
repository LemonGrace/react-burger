import React, {useCallback, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './registration.module.css'
import clsx from "clsx";
import {Link, Redirect} from 'react-router-dom';
import {createUser} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/cookie";

function RegistrationPage() {

    /** Может это вынести в отдельный компонент? Они же очень похожи с логином*/
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    /** Создание пользователя */
    const dispatch = useDispatch();
    let register = useCallback(
        e => {
            e.preventDefault();
            dispatch(createUser(form));
        },
        [form, dispatch]
    );

    /** Получение данных об авторизации */
    let isAuth = !!getCookie('token');
    React.useEffect(() => {
        // eslint-disable-next-line
        isAuth = !!getCookie('token');
    })

    /** Если еще не подгрузились данные, но ничего не делать */
    const {loginRequest} = useSelector(state => state.login);
    if (loginRequest) {
        return null;
    }

    if (!isAuth) {
        return (
            <form className={styles.wrapper} onSubmit={register}>
                <h1 className={clsx(styles.header, "mb-6 text_type_main-medium")}>Регистрация</h1>
                <div className={"mb-6"}>
                    <Input
                        value={form.name}
                        onChange={onChange}
                        placeholder={'Имя'}
                        name={"name"}
                        size={'default'}
                    />
                </div>
                <div className={"mb-6"}>
                    <EmailInput onChange={onChange} value={form.email} name={'email'}/>
                </div>
                <div className={"mb-6"}>
                    <PasswordInput name={'password'} value={form.password} onChange={onChange}/>
                </div>
                <div className={"mb-20"}>
                    <Button type="primary" size="medium" onClick={form.submit}> Зарегистрироваться </Button>
                </div>
                <p className={clsx(styles.text, "text_type_main-default text_color_inactive")}>
                    Уже зарегистрированы? <Link to={"/login"} className={styles.link}> Войти </Link>
                </p>
            </form>
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }
}
export default React.memo(RegistrationPage);
