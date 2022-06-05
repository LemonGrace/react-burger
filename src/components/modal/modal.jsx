import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {closeModal} from "../../services/actions/modal";
import {useDispatch} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";

const modalRoot = document.getElementById("modals");

function Modal(props) {
    const dispatch = useDispatch();
    const type = useRouteMatch("/ingredients") ? "details" : "order";
    const history = useHistory();
    
    const handleClose = React.useCallback(() => {
        /** Как только модалка с заказаком будет также вынесена, можно будет оставить только goBack*/
        if (type === "details") {
            history.goBack();
        } else {
            dispatch(closeModal());
        }
    }, [type, dispatch, history]);
    const escClose = React.useCallback((event) => {
        if (event.key === 'Escape') {
            if (type === "details") {
                history.goBack();
            } else {
                handleClose();
            }
        }
    }, [handleClose, history, type]);

    React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, [escClose]);

    return ReactDOM.createPortal(
        <React.Fragment>
            <ModalOverlay/>
            <div className={clsx(styles.modal)}>
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
