import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import * as ROUTES from '../../constants/routes';

import {Redirect} from 'react-router-dom'

import './SignIn.css';


class SignIn extends Component {
  renderRedirect = () => {
    if (this.props.Fm.loggedIn()) {
      return <Redirect to='/home' />
    }
  }
  
  handleClick = () => {
    console.log('yes');
    this.props.Fm.handleLogin().then(() => {
      this.props.history.push(ROUTES.HOME);  
    }); 
    this.props.history.push(ROUTES.HOME); 
  }
  
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="container">
          <div>
            <h1>Your Favorite Ethereum Wallet 💎></h1>
            <div className="divider"></div>
            <div id="section-login">(
              <button id="btn-login" className="btn" onClick={() => this.handleClick()}>Login with SMS</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFortmatic(SignIn);
