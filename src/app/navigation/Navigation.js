import React from 'react'
import { Link } from 'react-router-dom';
import "./Navigation.css";
import withFortmadic from "../../auth";

import * as ROUTES from '../../constants/routes';

class Navigation extends React.Component {
  render() {
    let auth = this.props.Fm.loggedIn();

    return(
      <div>
        {auth ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    );
  }
}
  
class NavigationAuth extends React.Component {
  render() {
    return(
      <div>
      <Link to={ROUTES.LANDING}>Landing</Link>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </div>
      
    );
  }
}

const NavigationNonAuth = () => (
  <div>yes</div>
);

export default withFortmadic(Navigation);