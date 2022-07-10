import {TWebSocketActions} from "../actions/webSocket";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "../constants/webSocket";

export interface IMessage {
    name: string;
    message: string;
}

type TWSState = {
    wsConnected: boolean;
    messages: any;
};
const initialState: TWSState = {
    wsConnected: false,
    messages: []
};

export const wsReducer = (state = initialState, action: TWebSocketActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return state;

        case WS_SEND_MESSAGE:
        default:
            return state;
    }
};