// Here, we will store the routes to navigate the user
// Importing React
import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// actions
import { resetAuth } from "../../../states/auth.state";

import Navlink from "../Navlink";

// Iterating throiugh lists to make the template cleaner
// Routes of when a user has logged in, so the Login and Sign up auth will be false
// The rest of them will be true
const routes = [
  {
    route: "Dashboard",
    to: "/dashboard",
    auth: true,
  },
  {
    route: "Analytics",
    to: "/analytics",
    auth: true,
  },
  {
    route: "Expense",
    to: "/expense",
    auth: true,
  },
  {
    route: "Income",
    to: "/income",
    auth: true,
  },
  {
    route: "Categories",
    to: "/categories",
    auth: true,
  },
  {
    route: "Login",
    to: "/login",
    auth: false,
  },
  {
    route: "Signup",
    to: "/signup",
    auth: false,
  },
];

export default function Header() {
  // Using auth state again
  // To not show login and signup if we logged in already
  const auth = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  // To navigate programatically w/o clicking a link
  // By react router DOM package
  const navigate = useNavigate(); 
// Boolean, token exists, user autheticated, token does not exist, user not authenticated
  const isAuthenticated = !!auth.token;

// on Logout Handler function
  function onLogoutHandler() {
    // Removing the token from Session Storage
    sessionStorage.removeItem("token"); // to clear the state when someone logs out and returns to login page again
    dispatch(resetAuth());
    navigate("/login");
  }

  return (
    // A Navbar bootstrap styling
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Navbar.Brand>
        <img
          alt="logo"
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Expenses
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            {/* Using a Boolean condition */}
          {isAuthenticated && // if user is Authenticated, only then routes will be seen
            routes
              .filter((route) => route.auth)
              .map((route) => (
                <Navlink key={route.to} to={route.to}>
                  {route.route}
                </Navlink>
              ))}
        </Nav>
        <Nav>
          {!isAuthenticated &&
            routes
              .filter((route) => !route.auth)
              .map((route) => (
                <Navlink key={route.to} to={route.to}>
                  {route.route}
                </Navlink>
              ))}
          {!!auth.token && (
            //   On clicking, we are activating the logout handler
            <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
