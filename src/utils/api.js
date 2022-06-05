import {authUrl, BaseUrl} from "./baseUrl";
import {getCookie, setCookie} from "./cookie";

export function checkResponse(response) {
    if (!response.ok) {
        throw new Error("response is not ok");
    }
}

export const getBurgerData = async () => {
    try {
        const url = BaseUrl + "ingredients";
        const response = await fetch(url);
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        throw new Error("response is not ok");
    }
}

export const createOrder = async (ingredients) => {
    try {
        const requestData = [];
        ingredients.map((item) => {return requestData.push(item.ingredient._id)});
        const url = BaseUrl + "orders";
        const response = await fetch(url, {
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

export const userAuth = async (form) => {
    try {
        const url = authUrl + (form.name ? "register" : "login");
        const response = await fetch(url, {
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

export const sendEmail = async (form) => {
    try {
        const url = BaseUrl + "password-reset";
        const response = await fetch(url, {
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

export const updatePassword = async (form) => {
    try {
        const url = BaseUrl + "password-reset/reset";
        const response = await fetch(url, {
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

const updateToken = async () => {
    try {
        const url = authUrl + "token";
        const response = await fetch(url, {
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
/** Запрос данных по токену */
export const getUserInfo = async () => {
    const url = authUrl + "user";
    try {
        const response = await fetch(url, {
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
    catch (e) {
        try {
            /** Обновление токена, если на тот запрос выпала ошибка */
            updateToken().then(res => {
                if (res && res.success) {
                    setCookie('refreshToken', res.refreshToken);
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    const response = fetch(url, {
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
                throw new Error("response is not ok")
            });
        }
        catch (e) {
            throw new Error("response is not ok");
        }
    }
}

export const updateUserInfo = async (form) => {
    try {
        const url = authUrl + "user";
        const response = await fetch(url, {
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

export const logOut = async () => {
    try {
        const url = authUrl + "logout";
        const response = await fetch(url, {
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