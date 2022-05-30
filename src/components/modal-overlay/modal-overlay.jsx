import React from 'react';
import styles from './modal-overlay.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_TYPE, DELETE_VISIBLE } from '../../services/actions/modal';
import { DELETE_INGREDIENT } from '../../services/actions/details';
import { DELETE_ORDER } from '../../services/actions/constructor';
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";

function ModalOverlay() {
	const dispatch = useDispatch();
	const type = useRouteMatch("/ingredients") ? "details" : "order";
	const history = useHistory();
	
	return (
		<div className={styles.overlay} onClick={() => {
			if (type === "details") {
				history.goBack();
			} else {
				dispatch({type: DELETE_VISIBLE});
				dispatch({type: DELETE_ORDER});
				dispatch({type: DELETE_TYPE});
			}
		}} />
	);
}

export default ModalOverlay;
