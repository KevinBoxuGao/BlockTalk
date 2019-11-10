import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withFortmatic} from "../../auth";
import {withRouter} from 'react-router-dom';

import 'bootstrap';
import * as ROUTES from '../../constants/routes';
import "./Navigation.scss";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    }
  }
  

  componentDidMount() {
    this.interval = setInterval( function() {
      if (this.props.location.pathname == '/home') {
        this.setState({authenticated: true});
      } else {
        this.setState({authenticated: false});
      }
    }.bind(this),
    500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div>
        {this.state.authenticated ? <NavigationAuth/> : <NavigationNonAuth/>}
      </div>
    );
  }
}
  
class NavigationAuth extends Component {
  logOut = () => {
    this.props.history.push(ROUTES.SIGN_IN);
    this.props.Fm.handleLogOut();
  }

  render() {
    return (
      <nav id="NavigationAuth" className="navbar navbar-expand">

        <Link className="navbar-brand" to={ROUTES.LANDING}>
          <h3>Blocktalk</h3> 
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">navbar-toggler</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto float-right">
            <li className="nav-item">
              <button id="btn-logout" className="link" onClick={() => this.logOut(updateAuth)}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class NavigationNonAuth extends Component {
  render() {
    return (
      <nav id="NavigationNonAuth" className="navbar navbar-expand">

        <Link className="navbar-brand" to={ROUTES.LANDING}>
          <h3>Blocktalk</h3> 
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">navbar-toggler</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto float-right">
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
          </ul>
        </div>

      </nav>
    )
  }
}

export default withRouter(withFortmatic(Navigation));