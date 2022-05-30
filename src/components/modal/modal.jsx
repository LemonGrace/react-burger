import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {DELETE_TYPE, DELETE_VISIBLE} from "../../services/actions/modal";
import {useDispatch} from "react-redux";
import {DELETE_ORDER} from "../../services/actions/constructor";
import {Link, useHistory, useRouteMatch, useLocation} from "react-router-dom";

const modalRoot = document.getElementById("modals");

function Modal(props) {
    const dispatch = useDispatch();
    const type = useRouteMatch("/ingredients") ? "details" : "order";
    const { state } = useLocation();
    const isInternal = state ? !!state.inner : type === "order";
    const history = useHistory();
    
    const handleClose = React.useCallback(() => {
        /** Как только модалка с заказаком будет также вынесена, можно будет оставить только goBack*/
        if (type === "details") {
            history.goBack();
        } else {
            dispatch({type: DELETE_VISIBLE});
            dispatch({type: DELETE_ORDER});
            dispatch({type: DELETE_TYPE});
        }
        // eslint-disable-next-line
    }, [type, dispatch]);
    const escClose = React.useCallback((event) => {
        if (event.key === 'Escape') {
            if (type === "details") {
                history.goBack();
            } else {
                handleClose()
            }
        }
        // eslint-disable-next-line
    }, [handleClose]);

    React.useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, [escClose]);

    return ReactDOM.createPortal(
        <React.Fragment>
            {isInternal && <ModalOverlay/>}
            <div className={clsx(styles.modal, isInternal&&styles.modalInner)}>
                <div className={clsx("text_type_main-large mt-10 mr-10 ml-10", styles.modalHeader,
                    !props.caption&&styles.modalCloseIconAlign)}>
                    {props.caption}
                    <Link to={"/"}><CloseIcon type="primary" onClick={handleClose}/></Link>
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
