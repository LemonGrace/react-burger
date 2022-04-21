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
          setState({...state, hasError: false, loading: true});
          const url = "https://norma.nomoreparties.space/api/ingredients";
          const data = await fetch(url).then(response => {
              return response.json();
          }).catch(e => {
              setState({...state, hasError: true, loading: false});
              console.log(e);
          });

          if (data && data.success) {
              setState({...state, burgerData: data.data, hasError: false, loading: false});
          }
          else {
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

    // eslint-disable-next-line
    const modalClose = () => {
        if (isVisibleDetails) {
            setVisibleDetails(false);
        }
        else if (isVisibleConstructor) {
            setVisibleConstructor(false);
        }
    }

    React.useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27 && (isVisibleConstructor || isVisibleDetails)){
                modalClose();
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[isVisibleConstructor, isVisibleDetails, modalClose])


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
