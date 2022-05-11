import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {DELETE_TYPE, DELETE_VISIBLE} from "../../services/actions/modal";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT} from "../../services/actions/details";
import {DELETE_ORDER} from "../../services/actions/constructor";

const modalRoot = document.getElementById("modals");

function Modal(props) {
    const dispatch = useDispatch();
    const type = useSelector(state => state.modal.type);
    const handleClose = React.useCallback(() => {
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
    }, [type, dispatch]);
    const escClose = React.useCallback((event) => {
        if (event.key === 'Escape') {
            handleClose();
        }
    }, [handleClose]);

    React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, [escClose]);

    return ReactDOM.createPortal(
        <React.Fragment>
            <ModalOverlay/>
            <div className={styles.modal}>
                <div className={clsx("text_type_main-large mt-10 mr-10 ml-10", styles.modalHeader,
                    !props.caption&&styles.modalCloseIconAlign)}>
                    {props.caption}
                    <CloseIcon type="primary" onClick={handleClose}/>
                </div>
                {props.children}
            </div>
        </React.Fragment>
        , modalRoot)
}

export default Modal;

Modal.propTypes = {
    caption: PropTypes.string.isRequired,
}
