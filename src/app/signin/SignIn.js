import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import * as ROUTES from '../../constants/routes';

import {Redirect} from 'react-router-dom'

import './SignIn.css';

import ErrorBoundary from '../../testing/ErrorBoundary'

class SignIn extends Component {
  renderRedirect = () => {
    if (this.props.Fm.loggedIn()) {
      return <Redirect to='/home' />
    }
  }

  handleClick = toggler => {
    this.props.Fm.handleLogin().then(() => {
      this.props.history.push(ROUTES.HOME);  
    }); 
  }
  
  render() {
    return (
      <div className="container">
        {this.renderRedirect()}
        <div>
          <h1>Your Favorite Ethereum Wallet 💎></h1>
          <div className="divider"></div>
          <div id="section-login">
            <a id="btn-login" className="btn" onClick={this.handleClick()}>Login with SMS</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withFortmatic(SignIn);
