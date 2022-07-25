import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import { render } from "react-dom";
import App from './components/app/app';
import { Provider } from 'react-redux';
import {rootReducer} from './services/reducers'
import {applyMiddleware, compose, createStore} from "@reduxjs/toolkit";
import thunk, { ThunkAction } from 'redux-thunk';
import {TAuthActions, TRecoverPasswordActions} from "./services/actions/auth";
import {TConstructorActions} from "./services/actions/constructor";
import {TIngredientsActions} from "./services/actions/ingredients";
import {TModalAction} from "./services/actions/modal";
import { Action, ActionCreator, Dispatch } from 'redux';
import { socketMiddleware } from './services/wsSocketMiddleware';
import {TFeedActions} from "./services/actions/feed";
import {TWebSocketActions, TWSActions} from './services/actions/webSocket';
import {
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "./services/constants/webSocket";
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const wsActions: TWSActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions =
    | TAuthActions
    | TRecoverPasswordActions
    | TConstructorActions
    | TIngredientsActions
    | TModalAction
    | TFeedActions
    | TWebSocketActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;


const root = document.getElementById("root");
render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>, root);

