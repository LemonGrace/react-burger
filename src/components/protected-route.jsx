import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from 'react-router-dom';
import Loading from "./loading/loading";
import PropTypes from "prop-types";

const LoginRedirect = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}}/>
);

const MainPageRedirect = () => (
    <Redirect to={{pathname: '/'}}/>
);

function ProtectedRoute({isForAuthUser = false, children, ...rest}) {

    const {isAuth, isUserLoading} = useSelector(state => state.user);

    const renderComponent = React.useMemo(() => {
        if (isForAuthUser && !isAuth) {
            return LoginRedirect;
        }

        if (!isForAuthUser && isAuth) {
            return MainPageRedirect;
        }

        return () => children;
    }, [children, isAuth, isForAuthUser]);

    if (isUserLoading) {
        return <Loading/>;
    }

    return (
        <Route
            {...rest}
            render={renderComponent}
        />
    );
}

export default ProtectedRoute;

/** Сделала не обязательным, так как мы задаем исходное значение в компоненте*/
ProtectedRoute.propTypes = {
    isForAuthUser: PropTypes.bool,
}
