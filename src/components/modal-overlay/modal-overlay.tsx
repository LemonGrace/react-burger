import React from 'react';
import styles from './modal-overlay.module.css';
import {useDispatch} from "../../utils/hooks";
import {closeModal} from '../../services/actions/modal';
import {useHistory, useRouteMatch} from "react-router-dom";
import {History} from "history";

function ModalOverlay() {
    const dispatch = useDispatch();
    const type: string = useRouteMatch("/ingredients") ? "details" : "order";
    const history: History = useHistory();

    const handleClose = () => {
        if (type === "details") {
            history.goBack();
        } else {
            dispatch(closeModal());
        }
    }

    return (
        <div className={styles.overlay} onClick={handleClose}/>
    );
}

export default ModalOverlay;
