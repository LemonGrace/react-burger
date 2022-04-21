import React from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay(props){
    return (
        <div className={styles.overlay} onClick={props.onClick}/>
    )
}
export default ModalOverlay;

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}
