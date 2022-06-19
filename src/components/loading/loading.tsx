import React from "react";
import styles from './loading.module.css';
import clsx from "clsx";
import LoadingIconPath from "../../images/loading.svg";

function Loading() {
    return (
        <div className={clsx(styles.loadingWindow, "text_type_main-large")}>
            Loading
            <img src={LoadingIconPath} alt={"Загрузка"} className={styles.loadingIcon}/>
        </div>
    )
}
export default React.memo(Loading);