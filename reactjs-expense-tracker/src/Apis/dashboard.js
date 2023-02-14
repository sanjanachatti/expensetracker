import { API } from "../env";
import { getAuthHeaders } from "../utils/common";

export const fetchDashBoard = (month = new Date().toISOString()) => {
  return fetch(`${API}/dash`, {
    method: "POST",
    body: JSON.stringify({ month }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchGraphData = (type) => {
  return fetch(`${API}/graph`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

