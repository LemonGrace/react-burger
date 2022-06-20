import React from 'react';
// import ReactDOM from 'react-dom/client';
import { render } from "react-dom";
import App from './components/app/app';
import { Provider } from 'react-redux';
import {rootReducer} from './services/reducers/index'
import {applyMiddleware, compose, createStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);
const root = document.getElementById("root");
render(
    <Provider store={store}>
    <App />
</Provider>, root);
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//     /** StrictMode с React 18.0.0 и react-router v5 блокирует работу Link */
//         <Provider store={store}>
//             <App />
//         </Provider>
// );

