import React, { Suspense, useEffect } from "react";
// Importing react router DOM to set navigation routes for the application
// To configure the end points like Login, Sign up, Dashboard
import { Routes, Route, Navigate } from "react-router-dom"; 
// Importing a bootstrap Container to add padding and border
import { Container } from "react-bootstrap";
// To get nice toast messages like, 'Succesfully logged in', 'Deleted succesfully'
// Toast container gives us a place for the toast to render in the app
import { ToastContainer } from "react-toastify";
// 2 hooks, useDispatch and useSelector
// useDispatch: A hook that returns a reference to the dispatch function from the Redux store
// useSelector: Allows us to extract data from the Redux store state, using a selector function
import { useDispatch, useSelector } from "react-redux";
// Importing styles for toasters
import "react-toastify/dist/ReactToastify.css";

// Actions
// To update the authentication state
import { setAuth } from "./states/auth.state";

import "./App.css";

// importing ui elements, the resuable components
import Header from "./components/UI/Header";
// To show 404 when page is not found
import Nomatch from "./components/UI/Nomatch"; 
// Global Spinner, ie, seen when we navigate from one page to another
import GlobalSpinner from "./components/UI/GlobalSpinner";
// importing pages by dynamic import syntax and react lazy
// to implement lazy loading
const Dashboard = React.lazy(() => import("./components/pages/Dashboard"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Signup = React.lazy(() => import("./components/pages/Signup"));
const Expense = React.lazy(() => import("./components/pages/Expense"));
const Income = React.lazy(() => import("./components/pages/Income"));
const Categories = React.lazy(() => import("./components/pages/Categories"));
const Analytics = React.lazy(() => import("./components/pages/Analytics"));


// Higher order components: functions that take a component and return a new component
// WithAuth is used, when token is present
// When a page takes time to load, suspense mode will fallback to some other component, and we can see a global spinner
function WithAuth(page, auth) {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      {/* If user is not authenticated, we redirected him to login page */}
      {auth ? page : <Navigate replace to="/login" />}
    </Suspense>
  );
}

// NoAuth is used, when token is absent
function NoAuth(page, auth) {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      {/* If user is authenticated, and wants to access the login page, we redirected him to dashboard */}
      {auth ? page : <Navigate replace to="/dashboard" />}
    </Suspense>
  );
}

// Main App component
function App() {
  // useDispatch hook is used as a function to dispatch some actions
  const dispatch = useDispatch(); // to dispatch actions like 
  // useSelector to pick particular path of our authentication state
  const auth = useSelector((state) => state.auth);
  // Getting token from our session storage, after a user logs in
  // Session Storage is for a particular tab, and is built in browser itself
  // When we close a tab, Session Storage is gone
  const token = sessionStorage.getItem("token");
  // useEffect hook, to handle side effects in react
  // A hook that takes in a function
  // This hook is implemented only when the component is loaded
  useEffect(() => {
    if (token) {
      // Initializing our global token
      dispatch(setAuth({ token })); //handling side effects in react
    }
    return () => {};
  }, []);
  return (
    <React.Fragment>
      {/* navbar */}
      <Header />
      {/* Container */}
      <Container fluid>
        {/* setting up the routes */}
        <Routes>
          <Route
          // Getting the token from session storage
          // If token is present, redirect to dashboard, else redirected to login
          // The navigate component is used for redirecting
            path="/"
            element={
              token ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
           {/* adding routes to the pages created */}
           {/* Mapping path -> components */}
          <Route path="/dashboard" element={WithAuth(<Dashboard />, !!token)} />
          <Route path="/analytics" element={WithAuth(<Analytics />, !!token)} />
          <Route path="/expense" element={WithAuth(<Expense />, !!token)} />
          <Route path="/income" element={WithAuth(<Income />, !!token)} />

          <Route
            path="/categories"
            element={WithAuth(<Categories />, !!token)}
          />
          {/* Using NoAuth for login and sign up */}
          <Route path="/login" element={NoAuth(<Login />, !token)} />
          <Route path="/signup" element={NoAuth(<Signup />, !token)} />
          {/* To display 404 page, we use '*' */}
          <Route path="*" element={<Nomatch />} />
        </Routes>
      </Container>
      {/* Toast COntainer has 3 themes: colored, light and dark */}
      <ToastContainer theme="colored" />
    </React.Fragment>
  );
}

export default App;
