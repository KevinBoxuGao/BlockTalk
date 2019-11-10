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
    console.log(this.props.Fm.loggedIn());
    this.props.Fm.handleLogin();
    this.props.history.push(ROUTES.HOME); 
  }
  
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="container">
          <div>
            <h1>Bytemail 2.0 - Your Favorite Ethereum DApp 💎</h1>
            <div className="divider"></div>
            <button id="btn-login" className="btn" onClick={() => this.handleClick()}>Login/Signup</button>
          </div>
        </div>
      </div>

    );
  }
}

export default withFortmatic(SignIn);
