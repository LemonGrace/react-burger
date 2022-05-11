import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useSelector, useDispatch  } from 'react-redux';
import {getItems} from "../../services/actions/ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {

    /** Получение данных об ингредиентах */
    const {itemsRequest, itemsFailed} = useSelector((state) => state.burgerIngredient);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

  return (
      <>
          <AppHeader/>
          {!itemsRequest && !itemsFailed &&
          <main className={styles.mainSection}>
              <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients/>
                  <BurgerConstructor/>
              </DndProvider>
          </main>}
      </>
  );
}

export default App;
