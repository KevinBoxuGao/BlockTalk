import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Home extends Component {
  renderRedirect = () => {
    if (!Fm.loggedIn()) {
      return <Redirect to='/signin' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        Home
      </div>
    )
  }
}

export default Home;
