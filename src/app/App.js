import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import { withAuthentication } from '../Session';
import "./App.css";

import Navigation from './navigation';
import LandingPage from './landing';
import SignInPage from './signin';
import HomePage from './home';

//dev
import ErrorBoundary from '../../testing/ErrorBoundary';

//function component
function App() {
  return(
    <Router>
      <div>
        <Navigation></Navigation>
        <hr/>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
      </div>
    </Router>
  );
}

export default withAuthentication(App);