import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {closeModal} from "../../services/actions/modal";
import {useDispatch, useSelector} from "../../utils/hooks";
import {useHistory} from "react-router-dom";
import {History} from "history";

const modalRoot = document.getElementById("modals")!;

interface IModalProps {
    caption: string;
    children?: ReactNode;
}

function Modal(props: IModalProps) {
    const dispatch = useDispatch();
    const type = useSelector(state => state.modal.typeModal);
    const history: History = useHistory();
    
    const handleClose = React.useCallback(() => {
        /** Как только модалка с заказом будет также вынесена, можно будет оставить только goBack*/
        if (type === "order") {
            dispatch(closeModal());
        } else {
            history.goBack();
        }
    }, [type, dispatch, history]);
    const escClose = React.useCallback((event: KeyboardEvent) => {
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

