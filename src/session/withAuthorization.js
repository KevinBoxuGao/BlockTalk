import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withFortmatic } from '../auth';
import * as ROUTES from '../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {

    render() {
      return (
        <AuthUserContext.Consumer>
          {({authUser, updateAuth}) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(withFortmatic(WithAuthorization));
};

export default withAuthorization;