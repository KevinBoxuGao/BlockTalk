import React from 'react'
import { Link } from 'react-router-dom';
import "./Navigation.css"

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <NavigationAuth /> 
  </div>
);
  
class NavigationAuth extends React.Component {

  render() {
    return(
      <div>
        NavigationAuth
      </div>
    );
  }
}

const NavigationNonAuth = () => (
  <div>
    <Link to={ROUTES.LANDING}>Landing</Link>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </div>
);

export default Navigation;