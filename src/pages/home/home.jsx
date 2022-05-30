import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../services/actions/ingredients";
import {DndProvider} from "react-dnd";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './home.module.css'
import {useHistory, useRouteMatch} from "react-router-dom";


function HomePage() {
    /** Получение данных об ингредиентах */
    const {itemsRequest, itemsFailed} = useSelector((state) => state.burgerIngredient);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    if (!itemsRequest && !itemsFailed) {
        return (
            <main className={styles.mainSection}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        )
    } else {
        return (<></>)
    }

}

export default React.memo(HomePage);
