import React from "react";
import ReactDOM from "react-dom";
import Fm, { FortmaticContext } from "./auth";

import App from "./app/App";

import "./index.scss";


if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
}

ReactDOM.render(
  <FortmaticContext.Provider value={new Fm()}>
    <App />
  </FortmaticContext.Provider>,
  document.getElementById("root"),
);
