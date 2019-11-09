import React from 'react';
import AuthUserContext from './context';
import Fm, { withFortmatic } from '../auth';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.toggleAuthState = () => {
        this.setState( {authUser: Fm.loggedIn}
        );
      };

      this.state = {
        authUser: false,
        authToggler: this.toggleAuthState,
      };
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  
  return withFortmatic(WithAuthentication);
};
export default withAuthentication;