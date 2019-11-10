import React, { Component } from 'react'
import { withFortmatic } from '../../auth';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext, AuthCentralState} from '../../session';
import {withRouter} from 'react-router-dom';

import './SignIn.scss';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  logIn = () => {
    this.props.history.push(ROUTES.SIGN_IN);
    //AuthCentralState.authenticate(() => {
    //  this.props.Fm.handleLogin().then(() => {
    //    this.setState(() => ({
    //      redirectToReferrer: true
    //    }));
    //  });
    //});
  }

  //handleClick = toggler => {
  //  this.props.Fm.handleLogin().then(() => {
  //    fm.user.getUser() 
  //  }).then(userdata => {
  //    toggler(userData)
  //  }).then(() => {
  //    this.props.history.push(ROUTES.HOME);
  //  })
  //}

  logOut = toggler => {
    this.props.Fm.handleLogOut().then(() => {
      toggler(null)
    }).then(() => {
      this.props.history.push(ROUTES.SIGN_IN);
    })
  }

  render() {
    const { from } = { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    console.log(from);

    //if (redirectToReferrer === true) {
    //  this.props.history.push(from.pathname);
    //}
    return (
      <AuthUserContext.Consumer>
        {({authUser, updateAuth}) =>
          <div className="container sign-in text-center">
            <div className="row align-items-center justify-content-center">
              <div className="col-6-lg col-8-sm">
                <div className="content d-flex flex-column">
                  <h1>Blocktalk💎</h1>
                  <div className="divider"></div>
                  <button id="btn-login" className="btn" onClick={() => this.props.history.push(ROUTES.SIGN_IN)}>Login/Signup</button>
                  <button id="btn-logout" className="btn" onClick={() => this.logOut(updateAuth)}>Logout</button>
                </div>
              </div>
            </div>
          </div>
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default withRouter(withFortmatic(SignIn));
