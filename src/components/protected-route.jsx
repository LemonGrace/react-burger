import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({isForAuthUser = false, children, ...rest}) {

    const {isAuth, isUserLoading} = useSelector(state => state.user);

    // TODO: сделать на следующей неделе лоудер!
    if (isUserLoading) {
        return (
            <div>Loading</div>
        )
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
                render={({}) => !isAuth ? (children) : (<Redirect to={{pathname: '/'}}/>)}
            />
        );
    }
}

export default ProtectedRoute;
