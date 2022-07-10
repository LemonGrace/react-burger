import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
} from './constants/webSocket'
import {TWebSocketActions} from "./actions/webSocket";
import {ordersBaseUrl} from "../utils/baseUrl";
import {TFeedOrdersWS} from "../utils/type";
import {DELETE_ORDERS, SET_ORDERS} from "./constants/feed";
import {getCookie} from "../utils/cookie";

export const socketMiddleware = () => {
    return (store: any) => {
        let socket: WebSocket;
        return (next: any) => (action: TWebSocketActions) => {
            const { dispatch} = store;

            if (action.type === WS_CONNECTION_START) {
                const {IsPersonal} = action;
                let url = ordersBaseUrl;
                if (!IsPersonal) {
                    url = url + '/all';
                } else {
                    const accessToken = getCookie('token');
                    url += `?token=${accessToken}`;
                }
                socket = new WebSocket(url);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS});
                };

                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR});
                    dispatch({type: DELETE_ORDERS});
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: TFeedOrdersWS = JSON.parse(data);
                    if (parsedData.success) {
                        const {success, ...data} = parsedData;
                        dispatch({type: SET_ORDERS, data: data});
                    }
                };
                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED});
                    dispatch({type: DELETE_ORDERS});
                };
            }

            next(action);
        };
    };
};