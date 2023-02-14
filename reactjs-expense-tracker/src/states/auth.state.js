// A file for creating a part in our store, and reacting with it to do changes in the application
// Using react js toolkit, to create a slice(auth) in the store
import { createSlice } from "@reduxjs/toolkit"; 

// Using createSlice method to create an auth slice and naming it as auth
const authSlice = createSlice({  
  name: "auth",
  initialState: {
    // Initial value is a token
    token: null, // intial token is null
  },
  // We have 2 reducers for this token; setAuth and resetAuth
  reducers: {
    setAuth: (state, action) => {
      // When we call setAuth, this function is executed
      state.token = action.payload.token; // Sending an object from setAuth, to update the token of the auth store
    },
    // Simply reseting the token value to null when a user logs out
    resetAuth: (state) => {
      state.token = null; 
    },
  },
});

// Exporting a named export
export const { setAuth, resetAuth } = authSlice.actions; 

// Exporting a default export authSlice.reducer and including it in store.js
export default authSlice.reducer;
