export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IOrderItem {
    ingredient: IIngredient;
    order: number
}

export interface IOrderFeed {
    ingredients: Array<string>,
    name: string,
    _id: string,
    status: 'done' | 'created' | 'pending',
    number: number,
    createdAt: string,
    updatedAt: string
}
export type TFeedOrdersWS = {
    success: boolean,
    orders: Array<IOrderFeed>,
    total: number,
    totalToday: number
};

export type TFeedOrders = {
    orders: Array<IOrderFeed>,
    total: number,
    totalToday: number,
    isLoading: boolean,
    isError: boolean,
    orderSelected: IOrderFeed | null
};