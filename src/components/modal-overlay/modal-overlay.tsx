import React from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
    onClose: any;
}

function ModalOverlay(props: IModalOverlay) {
    const handleClose = () => {
        props.onClose();
    }
    return (
        <div className={styles.overlay} onClick={handleClose}/>
    );
}

export default ModalOverlay;
