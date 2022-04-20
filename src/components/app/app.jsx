import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import {DATA} from '../../utils/data.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
      <>
        <AppHeader></AppHeader>
        <main className={styles.mainSection}>
            <BurgerIngredients data={DATA}/>
            <BurgerConstructor data={DATA}/>
        </main>
      </>
  );
}

export default App;
