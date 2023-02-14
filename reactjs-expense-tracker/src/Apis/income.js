import { API } from "../env";
import { getAuthHeaders } from "../utils/common";

export const createIncome = ({ amount, notes, income_date, categoryid }) => {
  return fetch(`${API}/add/income`, {
    method: "POST",
    body: JSON.stringify({ amount, notes, income_date, categoryid }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchIncome = () => {
  return fetch(`${API}/get/incomes`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const updateIncome = ({
  _id,
  amount,
  notes,
  income_date,
  categoryid,
}) => {
  return fetch(`${API}/update/income`, {
    method: "PATCH",
    body: JSON.stringify({ _id, amount, notes, income_date, categoryid }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const deleteIncome = (_id) => {
  return fetch(`${API}/delete/income`, {
    method: "DELETE",
    body: JSON.stringify({ _id }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchIncomeById = (id) => {
  return fetch(`${API}/get/income/single`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};
