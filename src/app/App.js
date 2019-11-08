import React from "react";
import PropTypes from 'prop-types';

import "./App.css";
//dev
import {hot} from "react-hot-loader";

//function component
function App() {
  return(
    <div>
      success
    </div>
  );
}

//class component
/* 
class ComponentName extends React.Component {
  static propTypes = {
    exampleProp: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      exampleState: null,
    };
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
*/

export default App;