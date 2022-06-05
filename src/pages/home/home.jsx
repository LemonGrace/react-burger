import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {DndProvider} from "react-dnd";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './home.module.css'


function HomePage() {
    /** Получение данных об ингредиентах */
    const {isIngredientsLoading, isIngredientsFailed} = useSelector((state) => state.burgerIngredient);
    const dispatch = useDispatch();
    React.useEffect(() => {
        //dispatch(getIngredients());
    }, [dispatch])

    // TODO: лоадинг!
    if (isIngredientsLoading || isIngredientsFailed) {
        return (<></>)
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
