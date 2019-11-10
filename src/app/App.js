import React from "react";
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import {withAuthentication} from '../session'
import { CSSTransition } from 'react-transition-group'

import * as ROUTES from '../constants/routes';

import Navigation from './navigation/Navigation';
import Landing from './landing/Landing';
import SignIn from './signin/SignIn';
import Home from './home/Home';

import "./App.scss";

const routes = [
  { path: '/', name: 'Landing', Component: Landing },
  { path: '/signin', name: 'Sign In', Component: SignIn },
  { path: '/home', name: 'Home', Component: Home },
]

//function component
function App() {
  return(
    <Router>
      <>
      <Navigation></Navigation>
      <div className="container">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>

      </>
    </Router>

  );
}

export default withAuthentication(App);