import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

/**
 * Disattivato momentaneamente
 */
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

/**
 * [a] Alla prima web request viene richiamata la funzione `loadUser`
 * la quale fa una api request al server inviando il token jwt
 * che sta nella localstorage. Se il token esiste ed è valido
 * l'utente viene autenticato ritornando i dati
 * dell'utente(nome,email,etc)
 */
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
