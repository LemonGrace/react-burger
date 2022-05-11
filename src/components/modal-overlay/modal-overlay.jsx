import React from 'react';
import styles from './modal-overlay.module.css'
import {useDispatch, useSelector} from "react-redux";
import {DELETE_TYPE, DELETE_VISIBLE} from "../../services/actions/modal";
import {DELETE_INGREDIENT} from "../../services/actions/details";
import {DELETE_ORDER} from "../../services/actions/constructor";

function ModalOverlay(){
    const dispatch = useDispatch();
    const type = useSelector(state => state.modal.type);
    return (
        <div className={styles.overlay} onClick={() => {
            dispatch({type: DELETE_VISIBLE});
            switch (type) {
                case "details": {
                    dispatch({type: DELETE_INGREDIENT});
                    return;
                }
                case "order": {
                    dispatch({type: DELETE_ORDER});
                    return;
                }
                default :
                    break;
            }
            dispatch({type: DELETE_TYPE});
        }}/>
    )
}
export default ModalOverlay;
