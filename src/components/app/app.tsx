import React from 'react';
import AppHeader from '../app-header/app-header';
import {Switch, Route, useLocation, useRouteMatch, useHistory} from 'react-router-dom';
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
import {useDispatch, useSelector} from "../../utils/hooks";
import styles from '../modal/modal.module.css';
import clsx from "clsx";
import {getUser} from "../../services/actions/auth";
import {History, Location} from "history";
import {getIngredients} from "../../services/actions/ingredients";
import FeedPage from "../../pages/feed/feed-page";
import OrderInfoDetails from "../order-info-details/order-info-details";

interface MatchParams {
    id: string;
}

const Main = () => {
    const location: Location = useLocation();
    const history: History = useHistory();
    const background: Location = location.state && (location.state as any).background;
    let id: string = ``;
    let matchProfile = useRouteMatch<MatchParams>("/profile/orders/:id");
    if (matchProfile) {
        id = matchProfile.params.id;
    }
    let matchFeed = useRouteMatch<MatchParams>("/feed/:id");
    if (matchFeed) {
        id = matchFeed.params.id
    }
    const handleClose = (): void => {
        history.goBack();
    }

    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path="/">
                    <HomePage/>
                </Route>
                <Route path="/ingredients/:id">
                    <div className={clsx(styles.modalCenter, "mt-30")}>
                        <span className={clsx("text_type_main-large", styles.modalHeader)}> Детали ингредиента</span>
                        <IngredientDetails/>
                    </div>
                </Route>
                <Route path="/feed/:id">
                    <div className={clsx(styles.modalCenterOrderInfo )}>
                        <span className={clsx("text_type_main-medium")}>#{id}</span>
                        <OrderInfoDetails/>
                    </div>
                </Route>
                <Route path="/feed">
                    <FeedPage/>
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
                <ProtectedRoute isForAuthUser={true} path="/profile/orders/:id">
                    <div className={clsx(styles.modalCenterOrderInfo )}>
                        <span className={clsx("text_type_main-medium")}>#{id}</span>
                        <OrderInfoDetails/>
                    </div>
                </ProtectedRoute>
                <ProtectedRoute isForAuthUser={true} path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
            </Switch>
            {
                background && (<Route path="/ingredients/:id">
                    <Modal caption={"Детали ингредиента"} onClose={handleClose}><IngredientDetails/></Modal>
                </Route>)
            }
            {
                background && (<Route path="/feed/:id">
                    <Modal caption={`#${id}`} onClose={handleClose}><OrderInfoDetails/></Modal>
                </Route>)
            }
            {
                background && (<Route path="/profile/orders/:id">
                    <Modal caption={`#${id}`} onClose={handleClose}><OrderInfoDetails/></Modal>
                </Route>)
            }
        </>
    )
}

function App() {
    /** Получение данных об авторизации */
    const dispatch = useDispatch();
    const {isAuth, isUserLoading} = useSelector(state => state.user);
    if (!isAuth && getCookie("token")) {
        if (!isUserLoading) dispatch(getUser());
    }
    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])
    return (
        <React.Fragment>
            <AppHeader/>
            <Main/>
        </React.Fragment>
    );
}

export default App;
