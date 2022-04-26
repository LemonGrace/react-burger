import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {BurgerContext} from "../../utils/burgerContext";
import {BaseUrl} from '../../utils/baseUrl';

export function checkResponse(response) {
    if (!response.ok) {
        throw new Error("response is not ok");
    }
}

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
              const url = BaseUrl + "ingredients";
              const response = await fetch(url);
              checkResponse(response);
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
      getBurgerData();
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
          <BurgerContext.Provider value={state.burgerData}>
              <AppHeader/>
              {!state.hasError && !state.loading &&
              <main className={styles.mainSection}>
                  <BurgerIngredients showModal={isVisibleDetails}
                                     openModal={modalOpen}
                                     closeModal={modalClose}/>

                  <BurgerConstructor showModal={isVisibleConstructor}
                                     openModal={modalOpen}
                                     closeModal={modalClose}/>

              </main>}
          </BurgerContext.Provider>
      </>
  );
}

export default App;
