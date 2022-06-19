import React from "react";
import styles from '../loading/loading.module.css';
import clsx from "clsx";

function Error() {
    return (
        <div className={clsx(styles.loadingWindow, "text_type_main-large")}>
            Что-то пошло не так!
        </div>
    )
}
export default React.memo(Error);