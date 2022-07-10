import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "../constants/webSocket";

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly IsPersonal: boolean;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSConnectionGet {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
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

export const wsConnectionStart = (isUser: boolean): IWSConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        IsPersonal: isUser,
    };
};

export const wsConnectionSuccess = (): IWSConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = (): IWSConnectionError => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IWSConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
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



