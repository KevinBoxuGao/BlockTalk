import React from 'react';
const ContextName = React.createContext(null);

//consumer wrapper
const withContextConsumer = Component => props => (
  <ContextName.Consumer>
    {value => <Component {...props} />}
  </ContextName.Consumer>
);

//provider wrapper
const withContextProvider = Component => {
  class WithContext extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        example: null,
      };
    }

    //...this.props is spread operator that formats each key inside to its value
    render() {
        return (
          <ContextName.Provider value={this.state.example}>
            <Component {...this.props} />
          </ContextName.Provider>
        );
    }
  }
}

export default withContextConsumer;

