import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import {AuthUserContext} from '../../session';
import {withRouter} from 'react-router-dom';
import 'bootstrap';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: {},
    }
  }

  componentDidMount() {
    this.props.Fm.fm.user.getUser().then(result => {
      this.setState({authUser: result});
    })
  }

  logOut = toggler => {
    this.props.Fm.handleLogOut().then(() => {
      toggler(null)
    }).then(() => {
      this.props.history.push(ROUTES.SIGN_IN);
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>user</h1>
          <button id="btn-logout" className="btn" onClick={() => this.logOut(updateAuth)}>Logout</button>
        </div>
      </div>
    );
  }
}

export default withRouter(withFortmatic(Home));
