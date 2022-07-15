import {TWebSocketActions} from "../../actions/webSocket";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "../../constants/webSocket";
import {TFeedOrdersData} from "../../../utils/type";

type TWSState = {
    wsConnected: boolean;
    messages: Array<TFeedOrdersData>;
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
                wsConnected: false,
                messages: [],
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                messages: [],
            };

        case WS_GET_MESSAGE: {
            return {
                ...state,
                messages:  [...state.messages, { ...action.payload }]
            };
        }

        case WS_SEND_MESSAGE:
        default:
            return state;
    }
};