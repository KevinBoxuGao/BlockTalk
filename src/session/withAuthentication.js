import React from 'react';
import AuthUserContext from './context';
import { withFortmatic } from '../auth';



const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: this.props.Fm.loggedIn() ? this.props.Fm.fm.user.getUser().then(result => result): null,
      };
    }

    updateAuth(authUser) {
      this.setState({authUser});
    }
    
    render() {
      return (
        <AuthUserContext.Provider value={ {authUser: this.state.authUser, updateAuth: this.updateAuth} }>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFortmatic(WithAuthentication);
};
export default withAuthentication;