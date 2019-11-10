import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import * as ROUTES from '../../constants/routes';

import {Redirect, Link} from 'react-router-dom'
import 'bootstrap';

import './Landing.scss'

class Landing extends Component {
  renderRedirect = () => {
    if (this.props.Fm.loggedIn()) {
      return <Redirect to='/home' />
    }
  }

  render() {
    return (
      <div id="LandingPage">
        {this.renderRedirect()}
        <div class="container align-middle">
          <div class="row">
            <div class="landing-content col text-center">
              <h1>Ethereum Based Messaging</h1>
              <p>Decentralized messaging platform</p>
              <Link className="btn" to={ROUTES.SIGN_IN}>Open Messaging</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withFortmatic(Landing);
