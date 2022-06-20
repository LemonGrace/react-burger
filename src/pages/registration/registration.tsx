import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './registration.module.css'
import clsx from "clsx";
import {Link} from 'react-router-dom';
import {enter} from "../../services/actions/auth";
import {useDispatch} from "react-redux";

interface IRegistrationFields {
    name: string;
    email: string;
    password: string;
}

function RegistrationPage() {

    const initialState: IRegistrationFields = {
        name: '',
        email: '',
        password: ''
    }

    const [form, setValue] = useState<IRegistrationFields>(initialState);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    /** Создание пользователя */
    const dispatch: any = useDispatch();
    const register = useCallback((e: React.SyntheticEvent): void => {
        e.preventDefault();
        dispatch(enter(form));
    }, [form, dispatch]);

    return (<form className={styles.wrapper} onSubmit={register}>
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
                <Button type="primary" size="medium" onClick={(form as unknown as HTMLFormElement).submit}>
                    Зарегистрироваться
                </Button>
            </div>
            <p className={clsx(styles.text, "text_type_main-default text_color_inactive")}>
                Уже зарегистрированы? <Link to={"/login"} className={styles.link}> Войти </Link>
            </p>
        </form>)
}

export default React.memo(RegistrationPage);
