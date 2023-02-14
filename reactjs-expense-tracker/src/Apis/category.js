import { API } from "../env";
import { getAuthHeaders } from "../utils/common";

export const createCategory = (category_name, category_type) => {
  return fetch(`${API}/add/category`, {
    method: "POST",
    body: JSON.stringify({ category_name, category_type }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchCategories = () => {
  return fetch(`${API}/get/all/categories`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchCategoriesByType = (type) => {
  return fetch(`${API}/get/categories`, {
    method: "POST",
    body: JSON.stringify({ category_type: type }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};
