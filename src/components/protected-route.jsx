import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import {getCookie} from "../utils/cookie";

function ProtectedRoute({ children, ...rest }) {
    /** Получение данных об авторизации */
    const isAuth = !!getCookie('token');
    const location = useLocation();
    console.log(location)

    /** Если еще не подгрузились данные, но ничего не делать */
    const {loginRequest} = useSelector(state => state.login);
    if (loginRequest) {
        return null;
    }
    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuth ? (children) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: location},
                    }}/>
                )
            }
        />
    );
}
export default ProtectedRoute;
