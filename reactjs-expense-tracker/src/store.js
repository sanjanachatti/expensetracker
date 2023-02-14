import { configureStore } from "@reduxjs/toolkit";

// importing reducers
import authReducer from "./states/auth.state";

// Here, we configure the global object 
// A JS object can have many keys, and a store object too can have many keys
// A specific key is the slice of the particular store
export default configureStore({
// Here we have authentication, ie, auth slice of the global object taht we mainly work with
// Reducer to interact with a particular auth slice
  reducer: {
    // In auth, we have a token which can be null or any string
    // A token is a JSON Web Token 
    auth: authReducer,
  },
  devTools: {},
});
