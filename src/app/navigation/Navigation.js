import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withFortmatic} from "../../auth";

import 'bootstrap';
import * as ROUTES from '../../constants/routes';
import "./Navigation.scss";

class Navigation extends Component {
  render() {
    let auth = this.props.Fm.loggedIn()
    return (
      <div>
        {auth ? <NavigationAuth/> : <NavigationNonAuth/>}
      </div>
    );
  }
}
  
class NavigationAuth extends Component {
  render() {
    return (
      <div>
        auths
      </div>
    )
  }
}

class NavigationNonAuth extends Component {
  render() {
    return (
      <nav id="NavigationNonAuth" className="navbar navbar-expand">

        <Link className="navbar-brand" to={ROUTES.LANDING}>
          <img src="../assets/BETA_LOGO.svg" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">navbar-toggler</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto float-right">
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
          </ul>
        </div>

      </nav>
    )
  }
}

export default withFortmatic(Navigation);