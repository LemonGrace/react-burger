import React from 'react';
import styles from './modal-overlay.module.css';
import {useDispatch} from 'react-redux';
import {closeModal, DELETE_TYPE, DELETE_VISIBLE} from '../../services/actions/modal';
import {useHistory, useRouteMatch} from "react-router-dom";

function ModalOverlay() {
    const dispatch = useDispatch();
    const type = useRouteMatch("/ingredients") ? "details" : "order";
    const history = useHistory();

    const handleClose = () => {
        if (type === "details") {
            history.goBack();
        } else {
            dispatch(closeModal);
        }
    }

    return (
        <div className={styles.overlay} onClick={handleClose}/>
    );
}

export default ModalOverlay;
