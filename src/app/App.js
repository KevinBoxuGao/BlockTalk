import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import { withAuthentication } from '../session';
import "./App.css";

import Navigation from './navigation/Navigation';
import Landing from './landing/Landing';
import SignIn from './signin/SignIn';
import Home from './home/Home';

//dev
import ErrorBoundary from '../testing/ErrorBoundary';

//function component
function App() {
  return(
    <Router>
      <Navigation></Navigation>
      <hr/>
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.HOME} component={Home} />
    </Router>
  );
}

export default withAuthentication(App);