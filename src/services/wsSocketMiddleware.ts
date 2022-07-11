import {TWebSocketActions} from "./actions/webSocket";
import {TFeedOrdersWS} from "../utils/type";
import { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch, RootState } from '..';

export const socketMiddleware = (wsActions: any): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket;
        return (next: any) => (action: TWebSocketActions) => {
            const { dispatch} = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            if (type === wsInit) {
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: TFeedOrdersWS = JSON.parse(data);
                    if (parsedData.success) {
                        const { success, ...restParsedData } = parsedData;
                        dispatch({ type: onMessage, payload: restParsedData });
                    }
                };
                socket.onclose = event => {
                    dispatch({type: onClose, payload: event});
                };
                if (type === wsSendMessage) {
                    const message = { ...payload };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};