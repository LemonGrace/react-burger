import React, {useCallback} from "react";
import {NavLink, useHistory} from "react-router-dom";
import styles from "./profile-nav.module.css";
import {useDispatch, useSelector} from "../../utils/hooks";
import clsx from "clsx";
import {logout} from "../../services/actions/auth";
import {History} from "history";


function ProfileNav() {

    const dispatch = useDispatch();
    const history: History = useHistory();
    const {username, email} = useSelector(state => state.user);
    const logoutUser = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(logout())
        if (!username && !email) {
            history.replace("/login");
        }
    }, [dispatch, history, email, username])
    
    
    return (
        <div>
            <div className={styles.linkBlock}>
                <NavLink
                    to="/profile"
                    exact={true}
                    activeClassName={styles.active}
                    className={clsx(styles.link, "text_type_main-medium text_color_inactive")}
                >
                    Профиль
                </NavLink>
            </div>
            <div className={styles.linkBlock}>
                <NavLink
                    to="/profile/orders"
                    activeClassName={styles.active}
                    className={clsx(styles.link, "text_type_main-medium text_color_inactive")}
                >
                    История заказов
                </NavLink>
            </div>
            <div className={styles.linkBlock}>
                <NavLink
                    to="/login"
                    activeClassName={styles.active}
                    className={clsx(styles.link, "text_type_main-medium text_color_inactive")}
                    onClick={logoutUser}
                >
                    Выход
                </NavLink>
            </div>
        </div>
    )
}
export default React.memo(ProfileNav)