import React from 'react';
const FortmaticContext = React.createContext(null);

const withFormatic = Component => props => (
  <FortmaticContext.Consumer>
    {Fm => <Component {...props} Fm={Fm} />}
  </FortmaticContext.Consumer>
);

export default FortmaticContext;
export {withFormatic};