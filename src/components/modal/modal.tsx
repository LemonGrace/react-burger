import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals")!;

interface IModalProps {
    caption: string;
    onClose?: any;
    children?: ReactNode;
}
//dispatch(closeModal());
function Modal(props: IModalProps) {
    const handleClose = React.useCallback(() => {
        props.onClose();
        /** Как только модалка с заказом будет также вынесена, можно будет оставить только goBack*/
    }, [props]);
    const escClose = React.useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            props.onClose();
        }
    }, [props]);

    React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, [escClose]);

    return ReactDOM.createPortal(
        <React.Fragment>
            <ModalOverlay onClose={props.onClose}/>
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

