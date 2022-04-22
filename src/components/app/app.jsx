import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [state, setState] = React.useState({
      burgerData: null,
      loading: true,
      hasError: false
  });

  React.useEffect(() => {
      const getBurgerData = async () => {
          try {
              setState({...state, hasError: false, loading: true});
              const url = "https://norma.nomoreparties.space/api/ingredients";
              const response = await fetch(url);
              const data = await response.json();
              if (data && data.success === true) {
                  setState({...state, burgerData: data.data, hasError: false, loading: false});
              } else {
                  throw new Error("DataError");
              }
          }
          catch (e) {
              console.log(e)
              setState({...state, hasError: true, loading: false});
          }
      }
      getBurgerData().then();
      // eslint-disable-next-line
  }, []);

    const [isVisibleDetails, setVisibleDetails] = React.useState(false);
    const [isVisibleConstructor, setVisibleConstructor] = React.useState(false);

    const modalOpen = (type, e) =>  {
        e.preventDefault();
        e.stopPropagation();
        if (type === "details") {
            setVisibleDetails(true);
        }
        if (type === "constructor") {
            setVisibleConstructor(true);
        }
    }

    const modalClose = () => {
        if (isVisibleDetails) {
            setVisibleDetails(false);
        }
        else if (isVisibleConstructor) {
            setVisibleConstructor(false);
        }
    }


  return (
      <>
        <AppHeader/>
        {!state.hasError && !state.loading &&
        <main className={styles.mainSection}>
            <BurgerIngredients data={state.burgerData}
                               showModal={isVisibleDetails}
                               openModal={modalOpen}
                               closeModal={modalClose}/>
            <BurgerConstructor data={state.burgerData}
                               showModal={isVisibleConstructor}
                               openModal={modalOpen}
                               closeModal={modalClose}/>
        </main>}
      </>
  );
}

export default App;
