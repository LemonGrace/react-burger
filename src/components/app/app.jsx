import React from 'react';
import AppHeader from '../app-header/app-header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/registration/registration";
import PasswordResetPage from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ProfilePage from "../../pages/profile/profile";


function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact={true} path="/">
                        <AppHeader/>
                        <HomePage/>
                    </Route>
                    <ProtectedRoute path="/ingredients/:id">
                        <AppHeader/>
                        <Modal caption={"Детали игредиента"}><IngredientDetails/></Modal>
                    </ProtectedRoute>
                    <Route path="/login">
                        <AppHeader/>
                        <LoginPage/>
                    </Route>
                    <Route path="/register">
                        <AppHeader/>
                        <RegistrationPage/>
                    </Route>
                    <Route path="/forgot-password">
                        <AppHeader/>
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path="/reset-password">
                        <AppHeader/>
                        <PasswordResetPage/>
                    </Route>
                    <ProtectedRoute path="/profile">
                        <AppHeader/>
                        <ProfilePage/>
                    </ProtectedRoute>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
