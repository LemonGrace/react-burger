import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "../constants/webSocket";
import {TFeedOrdersData} from "../../utils/type";

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: any;
}
export interface IWSConnectionGet {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TFeedOrdersData;
}
export interface IWSConnectionSend {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}

export type TWebSocketActions =
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSConnectionGet
    | IWSConnectionSend;

export const wsConnectionStart = (url: string): IWSConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: url,
    };
};

export const wsConnectionSuccess = (): IWSConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS,
        payload: ''
    };
};

export const wsConnectionError = (): IWSConnectionError => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: ''
    };
};

export const wsConnectionClosed = (): IWSConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED,
        payload: ''
    };
};

export const wsGetMessage = (message: any): IWSConnectionGet => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: any): IWSConnectionSend => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

