import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modals");

function Modal(props) {

    const escClose = React.useCallback((event) => {
        if (event.key === 'Escape') {
            props.onClick();
        }
        //eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, [escClose]);

    return ReactDOM.createPortal(
        <React.Fragment>
            <ModalOverlay onClick={props.onClick}/>
            <div className={styles.modal}>
                <div className={clsx("text_type_main-large mt-10 mr-10 ml-10", styles.modalHeader,
                    !props.caption&&styles.modalCloseIconAlign)}>
                    {props.caption}
                    <CloseIcon type="primary" onClick={props.onClick}/>
                </div>
                {props.children}
            </div>
        </React.Fragment>
        , modalRoot)
}

export default Modal;

Modal.propTypes = {
    caption: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
