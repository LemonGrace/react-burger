import React, {FC, ReactNode } from "react";
import {useSelector} from "../utils/hooks";
import {Route, Redirect} from 'react-router-dom';
import Loading from "./loading/loading";
import {Location} from "history";

interface IRedirectProps {
    location: Location;
}

const LoginRedirect:FC<IRedirectProps> = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}}/>
);

const MainPageRedirect:FC<IRedirectProps> = ({location}) => {
    const background = location.state && (location.state as any).from;
    if (background) {
        return (
            <Redirect to={{pathname: background.pathname}}/>
        )
    }
    return (
        <Redirect to={{pathname: '/'}}/>
    )
};

interface IProtectedRouteProps {
    path: string;
    isForAuthUser?: boolean,
    children?: ReactNode;
}

function ProtectedRoute({isForAuthUser = false, children, ...rest}: IProtectedRouteProps) {

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
