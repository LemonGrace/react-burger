import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
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
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));
const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions =
    | TAuthActions
    | TRecoverPasswordActions
    | TConstructorActions
    | TIngredientsActions
    | TModalAction
    | TFeedActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;


const root = document.getElementById("root");
render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>, root);

