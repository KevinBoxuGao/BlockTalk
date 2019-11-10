const fakeAuthCentralState = {
    isAuthenticated: false,
    authenticate(callback) {
       this.isAuthenticated = true;
       setTimeout(callback, 300);
    },
    signout(callback) {
       this.isAuthenticated = false;
       setTimeout(callback, 300); 
    }
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
       fakeAuthCentralState.isAuthenticated === true ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
    )} />
);