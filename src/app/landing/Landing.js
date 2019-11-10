import React, { Component } from 'react'
import { withFortmatic } from '../../auth';

import {Redirect} from 'react-router-dom'
import 'bootstrap';

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
        <div class="container">
          <div class="row">
            <div class="col">
              <h1>Ethereum Based Messaging</h1>
              <p>Decentralized messaging platform</p>
              <button>Open Messaging</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withFortmatic(Landing);
