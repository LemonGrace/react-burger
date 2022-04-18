import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import {DATA} from '../../utils/data.js';

function App() {
  return (
      <>
        <AppHeader></AppHeader>
        <main className={styles.mainSection}>
        </main>
      </>
  );
}

export default App;
