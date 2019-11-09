import React from 'react';
import AuthUserContext from './context';
import { withFortmatic } from '../auth';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }
    

    
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  
  return withFortmatic(WithAuthentication);
};
export default withAuthentication;