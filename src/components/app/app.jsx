import React from 'react';
import AppHeader from '../app-header/app-header';
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/registration/registration";
import PasswordResetPage from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ProfilePage from "../../pages/profile/profile";
import {getCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "react-redux";
import styles from '../modal/modal.module.css';
import clsx from "clsx";
import {getUser} from "../../services/actions/auth";


const Main = () => {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path="/">
                    <HomePage/>
                </Route>
                <Route path="/ingredients/:id">
                    <div className={clsx(styles.modalCenter, "mt-30")}>
                        <span className={clsx("text_type_main-large", styles.modalHeader)}> Детали игредиента</span>
                        <IngredientDetails/>
                    </div>
                </Route>
                <ProtectedRoute path="/login">
                    <LoginPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/register">
                    <RegistrationPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/forgot-password">
                    <ForgotPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/reset-password">
                    <PasswordResetPage/>
                </ProtectedRoute>
                <ProtectedRoute isForAuthUser={true} path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
            </Switch>
            {
                background && (<Route path="/ingredients/:id"
                render={() => (
                    <Modal caption={"Детали игредиента"}><IngredientDetails/></Modal>
                )}>
                </Route>)
            }
        </>
    )
}

function App() {
    /** Получение данных об авторизации */
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.user);
    console.log("gjjgj")
    if (!isAuth && getCookie("token")) {
        dispatch(getUser());
    }
    return (
        <React.Fragment>
            <Router>
                <AppHeader/>
                <Main />
            </Router>
        </React.Fragment>
    );
}

export default App;
