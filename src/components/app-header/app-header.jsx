import React from 'react';
import clsx from 'clsx';
import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function WrappedComponent() {
    return (
        <header className={styles.appHeaderWrapper}>
            <nav className={styles.appHeaderNavigation}>
                <ul className={clsx("mt-4 mb-4 pt-4 pb-4", styles.ulLeft, styles.ul)}>
                    <li className={clsx(styles.li, "text_type_main-default mr-2 pl-5 pr-5")}>
                        <BurgerIcon type="primary"/> <span className="pl-2">Конструктор</span>
                    </li>
                    <li className={clsx(styles.li,"text_type_main-default text_color_inactive pl-5 pr-5")}>
                        <ListIcon type="secondary"/> <span className="pl-2">Лента заказов</span>
                    </li>
                </ul>
                <div className={clsx("mt-4 mb-4", styles.logo)}><Logo /></div>
                <ul className={clsx("mt-4", "mb-4", "pt-4", "pb-4", styles.ulRight, styles.ul)}>
                    <li className={clsx(styles.li,"text_type_main-default text_color_inactive pl-5 pr-5")}>
                        <ProfileIcon type="secondary"/> <span className="pl-2">Личный кабинет</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const AppHeader = React.memo(WrappedComponent);
export default AppHeader;
