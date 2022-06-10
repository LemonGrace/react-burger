import React from 'react';
import clsx from 'clsx';
import styles from "./app-header.module.css";
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink} from "react-router-dom";
import {useRouteMatch} from 'react-router-dom';

function AppHeader() {
    /** Получение данных об активной странице */
    const isMainPageActive = useRouteMatch({
        path: "/",
        strict: true
    }).isExact;
    const isHistoryOrderPageActive = !!useRouteMatch("/order");
    const isProfilePageActive = !!useRouteMatch("/profile");

    return (
        <header className={styles.appHeaderWrapper}>
            <nav className={styles.appHeaderNavigation}>
                <ul className={clsx("mt-4 mb-4 pt-4 pb-4", styles.ulLeft, styles.ul)}>
                    <NavLink to={'/'}
                             exact={true}
                             activeClassName={styles.active}
                             className={clsx(styles.li, "text_type_main-default mr-2 pl-5 pr-5 text_color_inactive")}
                    >
                        <BurgerIcon type={isMainPageActive ? "primary" : "secondary"}/>
                        <span className="pl-2">Конструктор</span>
                    </NavLink>
                    <NavLink to={'/'}
                             exact={true}
                             activeClassName={styles.active}
                             className={clsx(styles.li, "text_type_main-default pl-5 pr-5 text_color_inactive")}
                    >
                        <ListIcon type={isHistoryOrderPageActive ? "primary" : "secondary"}/>
                        <span className="pl-2">Лента заказов</span>
                    </NavLink>
                </ul>
                <div className={clsx("mt-4 mb-4", styles.logo)}><Logo/></div>
                <ul className={clsx("mt-4", "mb-4", "pt-4", "pb-4", styles.ulRight, styles.ul)}>
                    <NavLink to={'/profile'}
                             activeClassName={styles.active}
                             className={clsx(styles.li, "text_type_main-default pl-5 pr-5 text_color_inactive")}
                    >
                        <ProfileIcon type={isProfilePageActive ? "primary" : "secondary"}/>
                        <span className="pl-2">Личный кабинет</span>
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
}

export default React.memo(AppHeader);
