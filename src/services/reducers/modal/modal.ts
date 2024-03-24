import {TModalAction} from "../../actions/modal";
import {DELETE_TYPE, DELETE_VISIBLE, SET_TYPE, SET_VISIBLE} from "../../constants/modal";

/** редьюсер для работы с модальным окном */
type TModal = {
    isVisible: boolean,
    typeModal: string;
};
const initialStateModal: TModal = {
    isVisible: false,
    typeModal: ``,
}
export const modal = (state = initialStateModal, action: TModalAction) => {
    switch (action.type) {
        case SET_VISIBLE: {
            return { ...state, isVisible: true };
        }
        case DELETE_VISIBLE: {
            return { ...state, isVisible: false };
        }
        case SET_TYPE: {
            return {...state, typeModal: action.typeModal};
        }
        case DELETE_TYPE: {
            return {...state, typeModal: ``};
        }
        default: return state;
    }
}