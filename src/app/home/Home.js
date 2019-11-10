import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import 'bootstrap';

import {Redirect} from 'react-router-dom'

class Home extends Component {
  renderRedirect = () => {
    if (!this.props.Fm.loggedIn()) {
      return <Redirect to='/signin' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="container">
          home
        </div>
      </div>
    )
  }
}

export default withFortmatic(Home);
