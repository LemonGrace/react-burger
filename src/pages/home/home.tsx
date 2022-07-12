import React from "react";
import {useSelector} from "../../utils/hooks";
import {DndProvider} from "react-dnd";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './home.module.css'
import Loading from "../../components/loading/loading";


function HomePage() {
    /** Получение данных об ингредиентах */
    const {isIngredientsLoading, isIngredientsFailed}
        = useSelector(state => state.burgerIngredient);

    if (isIngredientsLoading || isIngredientsFailed) {
        return (<Loading/>)
    }
    return (
        <main className={styles.mainSection}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </main>
    )
}

export default React.memo(HomePage);
