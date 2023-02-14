// The entry point of the react application
// Importing react library as a default import
import React from "react";
// To mount the virutal DOM tree into our web browser, we import ReactDOM
import ReactDOM from "react-dom";
// Imported CSS from index.css file
import "./index.css";
import App from "./App";
// Measuring the real life performance of your app.
import reportWebVitals from "./reportWebVitals";
// To enable browser routing in the application
import { BrowserRouter } from "react-router-dom";
// Importing React Redux, a a pattern and library for managing and updating application's authentication state
// To know when user logged in or out
// Global state manegement using Redux
// We represent entire state of the application shared by diff components, in single global object  
import { Provider } from "react-redux";

import store from "./store";

// Using the JSX Syntax, which is writing HTMl in JavaScript
ReactDOM.render(
  //  A helper component that help write better react components
  <React.StrictMode>
    
    <Provider store={store}>
      <BrowserRouter>
      {/* The main App imported from App.js */}
        <App />   
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  // The ID 'root' is connected to index.html
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
