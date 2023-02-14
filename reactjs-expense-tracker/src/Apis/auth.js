import { API } from "../env";

// Login API
export const login = (email, password) => {
  return fetch(`${API}/valid/user`, {
    method: "POST",
    body: JSON.stringify({ password, email }),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};

// Sign up API
export const signup = (username, email, password) => {
  return fetch(`${API}/add/user`, {
    method: "POST",
    body: JSON.stringify({ username, password, email }),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};
