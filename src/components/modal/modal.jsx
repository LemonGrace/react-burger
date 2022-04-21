import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

function Modal(props) {
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
        , document.body)
}

export default Modal;

Modal.propTypes = {
    caption: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
