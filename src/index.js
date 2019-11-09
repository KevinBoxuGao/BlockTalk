import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import Fm, { FortmaticContext } from "./auth";

import "./index.scss";
import "./normalize.css";

import 'bootstrap';
import $ from 'jquery';

if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
}

ReactDOM.render(
  <FortmaticContext.Provider value={new Fm()}>
    <App />
  </FortmaticContext.Provider>,
  document.getElementById("root"),
);
