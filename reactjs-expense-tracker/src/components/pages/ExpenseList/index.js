import React, { useState, useEffect } from "react";

import { Col, ListGroup, Spinner, Row } from "react-bootstrap";
import { deleteExpense, fetchExpenses } from "../../../Apis/expense";

import AmountItem from "../../UI/AmountItem";

import { useFetch } from "../../../hooks/useFetch";
import { useNavigateParams } from "../../../hooks/useNavigateParams";

export default function ExpenseList({ refetch, onChange }) {
  const { data: response, loading, error } = useFetch(fetchExpenses, [refetch]);
  console.log(response, error);
  const navigate = useNavigateParams();
  function onEditExpenseHandler(id) {
    console.log(id);
    navigate("/expense", `expenseId=${id}`);
  }

  function onDeleteExpenseHandler(id) {
    deleteExpense(id).then(() => {
      onChange();
    });
  }
  return (
    <Col className="p-3 col-12 col-sm-5">
      <h4 className="text-center">Expenses</h4>
      <ListGroup
        style={{ height: "400px", overflowY: "scroll" }}
        className="px-3"
      >
        {!loading && response ? (
          response.data.map((income) => (
            <AmountItem
              key={income._id}
              id={income._id}
              category={income.category}
              amount={income.amount}
              date={income.date}
              notes={income.notes}
              onEdit={onEditExpenseHandler}
              onDelete={onDeleteExpenseHandler}
            />
          ))
        ) : (
          <Row className="justify-content-center">
            <Spinner
              as="span"
              animation="border"
              size="md"
              variant="info"
              role="status"
            />
          </Row>
        )}
      </ListGroup>
    </Col>
  );
}
