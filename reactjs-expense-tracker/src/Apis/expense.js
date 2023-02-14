import { API } from "../env";
import { getAuthHeaders } from "../utils/common";

export const createExpense = ({ amount, notes, expense_date, categoryid }) => {
  return fetch(`${API}/add/expense`, {
    method: "POST",
    body: JSON.stringify({ amount, notes, expense_date, categoryid }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchExpenses = () => {
  return fetch(`${API}/get/expenses`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const updateExpense = ({
  _id,
  amount,
  notes,
  expense_date,
  categoryid,
}) => {
  return fetch(`${API}/update/expense`, {
    method: "PATCH",
    body: JSON.stringify({ _id, amount, notes, expense_date, categoryid }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const deleteExpense = (_id) => {
  return fetch(`${API}/delete/expense`, {
    method: "DELETE",
    body: JSON.stringify({ _id }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};

export const fetchExpenseById = (id) => {
  return fetch(`${API}/get/expense/single`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
  }).then((res) => res.json());
};
