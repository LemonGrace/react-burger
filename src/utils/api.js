import {BaseUrl} from "./baseUrl";

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
        return "Has error";
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
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ingredients: requestData})
        });
        checkResponse(response);
        return response.json();
    }
    catch (e) {
        return "Has error";
    }
}
