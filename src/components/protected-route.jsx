import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from 'react-router-dom';
import Loading from "./loading/loading";

function ProtectedRoute({isForAuthUser = false, children, ...rest}) {

    const {isAuth, isUserLoading} = useSelector(state => state.user);

    if (isUserLoading) {
        return (<Loading/>)
    }

    if (isForAuthUser) {
        return (
            <Route
                {...rest}
                render={({location}) => (isAuth) ?
                    (children) : (<Redirect to={{
                    pathname: '/login', state: {from: location},
                }}/>)}
            />
        );
    } else {
        return (
            <Route
                {...rest}
                render={() => !isAuth ? (children) : (<Redirect to={{pathname: '/'}}/>)}
            />
        );
    }
}

export default ProtectedRoute;
