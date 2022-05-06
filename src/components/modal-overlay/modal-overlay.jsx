import React from 'react';
import styles from './modal-overlay.module.css'
import {useDispatch} from "react-redux";
import {DELETE_TYPE, DELETE_VISIBLE} from "../../services/actions/modal";
import {DELETE_INGREDIENT} from "../../services/actions/details";

function ModalOverlay(){
    const dispatch = useDispatch();
    return (
        <div className={styles.overlay} onClick={() => {
            dispatch({type: DELETE_VISIBLE});
            dispatch({type: DELETE_TYPE});
            dispatch({type: DELETE_INGREDIENT});
        }}/>
    )
}
export default ModalOverlay;
