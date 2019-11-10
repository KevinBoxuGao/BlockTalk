import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import 'bootstrap';

class Home extends Component {

  render() {
    return (
      <div>
        <div className="container">
          home
        </div>
      </div>
    )
  }
}

export default withFortmatic(Home);
