import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateInfo} from "../../services/actions/auth";
import ProfileNav from "../../components/profile-nav/profile-nav";
import styles from "./profile.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

function ProfilePage() {
    const {userInfoRequest, userInfoFailed, user} = useSelector(state => state.user)
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch])
    
    
    const ProfileData = () => {
        
        const [form, setValue] = React.useState({ name: user.name, email: user.email, password: '' });
        const onChange = e => {
            setValue({ ...form, [e.target.name]: e.target.value });
        };
        const dispatch = useDispatch();
        let update = useCallback(
            e => {
                e.preventDefault();
                dispatch(updateInfo(form));
            },
            [form, dispatch]
        );
        if (!userInfoRequest && !userInfoFailed) {
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
                        <p className={clsx("mr-7  text_type_main-small", styles.cancel)} onClick={() => {
                            setValue({...form, name: user.name, email: user.email})
                        }}>
                            Отмена
                        </p>
                        <Button type="primary" size="medium" onClick={update}> Сохранить </Button>
                    </div>
                </form>
            )
        } else {
            return null;
        }
    }

    return (
        <main className={clsx(styles.wrapper, "mt-30")}>
            <section className={styles.sectionWrapper}>
                <ProfileNav/>
                <div className={"mt-20 text_type_main-small text_color_inactive"}>В этом разделе вы можете изменить свои персональные данные</div>
            </section>
            <ProfileData/>
        </main>
    )
}

export default React.memo(ProfilePage);
