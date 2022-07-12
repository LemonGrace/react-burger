import {authUrl, BaseUrl} from "./baseUrl";
import {getCookie, setCookie} from "./cookie";
import {IIngredient, IOrderFeed, IOrderItem} from "./type";
import {IUserInfo} from "../pages/profile/profile";
import {IForgotPasswordFields} from "../pages/forgot-password/forgot-password";
import {ILoginFields} from "../pages/login/login";
import { IRegistrationFields } from "../pages/registration/registration";
import {IResetPasswordFields} from "../pages/reset-password/reset-password";


interface IIngredientJson {
    readonly success: boolean;
    readonly data: Array<IIngredient>
}

export function checkResponse(response: Response): void | Error {
    if (!response.ok) {
        throw new Error("response is not ok");
    }
}

export const getBurgerData = async (): Promise<IIngredientJson | Error> => {
    try {
        const url: string = BaseUrl + "ingredients";
        const response: Response = await fetch(url);
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

interface IOrderInfoJSON {
    success: boolean;
    orders: Array<IOrderFeed>
}

export const getOrderInfo = async (number: number): Promise<IOrderInfoJSON | Error> => {
    try {
        const url: string = BaseUrl + "orders/" + number.toString();
        const response: Response = await fetch(url);
        checkResponse(response);
        return response.json();
    } catch (e) {
        throw new Error("response is not ok");
    }
}

interface IOrderInfo {
    readonly createdAt: string;
    readonly name: string;
    readonly number: number;
    readonly price: number;
    readonly status: string;
    readonly updatedAt: string;
    readonly _id: string;
    readonly ingredients: Array<IIngredient>;
    readonly owner: {
        readonly createdAt: string;
        readonly email: string;
        readonly name: string;
        readonly updatedAt: string
    }
}
interface IOrderJSON {
    readonly success: boolean;
    readonly name: string;
    readonly order: IOrderInfo;
}

export const createOrder = async (ingredients: Array<IOrderItem>): Promise<IOrderJSON | Error> => {
    try {
        const requestData: Array<string> = [];
        ingredients.map((item) => {return requestData.push(item.ingredient._id)});
        const url: string = BaseUrl + "orders";
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
            body:  JSON.stringify({ingredients: requestData})
        });
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

export interface IUser {
    readonly name: string;
    readonly email: string;
}
interface IUserJSON {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly success: boolean;
    readonly user: IUser;
}
export const userAuth = async (form: ILoginFields | IRegistrationFields): Promise<IUserJSON | Error> => {
    try {
        const url = authUrl + ((form as IRegistrationFields).name ? "register" : "login");
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        });
        checkResponse(response);
        return response.json();

    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

interface IEmailJSON {
    readonly success: boolean;
    readonly message: string;
}
export const sendEmail = async (form: IForgotPasswordFields): Promise<IEmailJSON | Error> => {
    try {
        const url: string = BaseUrl + "password-reset";
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        });
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

interface IUpdateJSON {
    readonly success: boolean;
    readonly message: string;
}
export const updatePassword = async (form: IResetPasswordFields): Promise<IUpdateJSON | Error> => {
    try {
        const url: string = BaseUrl + "password-reset/reset";
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        });
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

interface ITokenJSON {
    readonly success: boolean;
    readonly accessToken: string;
    readonly refreshToken: string;
}
const updateToken = async (): Promise<ITokenJSON | Error> => {
    try {
        const url: string = authUrl + "token";
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body:  JSON.stringify({token: getCookie('refreshToken')})

        });
        checkResponse(response)
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

export interface IUserInfoJSON {
    readonly success: boolean;
    readonly user: IUser;
}
/** Запрос данных по токену */
export const getUserInfo = async (): Promise<IUserInfoJSON | undefined | Error> => {
    const url: string = authUrl + "user";
    try {
        const response: Response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        try {
            /** Обновление токена, если на тот запрос выпала ошибка */
            updateToken().then(async res => {
                //@ts-ignore
                if (res && res.success) {
                    //@ts-ignore
                    setCookie('refreshToken', res.refreshToken);
                    //@ts-ignore
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    const response: Response = await fetch(url, {
                        method: 'GET',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + getCookie('token')
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer'
                    });
                    checkResponse(response)
                    return response.json();
                }
            }).catch(e => {

            });
        }
        catch (e) {
            throw new Error("response is not ok");
        }
    }
}

interface IUserUpdateJSON {
    readonly success: boolean;
    readonly user: IUser;
}
export const updateUserInfo = async (form: IUserInfo): Promise<IUserUpdateJSON | Error> => {
    try {
        const url: string = authUrl + "user";
        const response: Response = await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        });
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

interface ILogoutJSON {
    readonly message: string;
    readonly success: boolean;
}
export const logOut = async (): Promise<ILogoutJSON | Error> => {
    try {
        const url: string = authUrl + "logout";
        const response: Response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body:  JSON.stringify({token: getCookie('refreshToken')})

        });
        checkResponse(response)
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}