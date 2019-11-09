import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.scss"
import "./normalize.css"

import 'bootstrap';
import $ from 'jquery';

if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
}

ReactDOM.render(<App />, document.getElementById("root"));