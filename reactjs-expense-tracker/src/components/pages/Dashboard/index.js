import React, { useState } from "react";

import { Container, Row, Spinner } from "react-bootstrap";
import AmountCard from "../../UI/AmountCard";
import ExpenseList from "../ExpenseList";
import IncomeList from "../IncomeList";

// custom hooks
import { useFetch } from "../../../hooks/useFetch";
import { fetchDashBoard } from "../../../Apis/dashboard";

export default function Dashboard() {
  const [expenseRefetch, setExpenseRefetch] = useState(0);
  const [incomeRefetch, setIncomeRefetch] = useState(0);
  const {
    data: response,
    loading,
    error,
  } = useFetch(fetchDashBoard, [expenseRefetch, incomeRefetch]);
  console.log(response);
  return (
    <Container fluid style={{ marginTop: "60px" }}>
      <Row className="justify-content-center align-align-items-center">
        {!loading && response ? (
          <>
            <AmountCard
              title="Expense Amount"
              amount={response.data.total_expenses}
            />
            <AmountCard
              title="Income Amount"
              amount={response.data.total_income}
            />
            <AmountCard title="Savings Amount" amount={response.data.net} />
          </>
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
      </Row>
      <hr />
      <Row className="justify-content-center align-align-items-center">
        <ExpenseList
          refetch={expenseRefetch}
          onChange={() => setExpenseRefetch((f) => f + 1)}
        />
        <IncomeList
          refetch={incomeRefetch}
          onChange={() => setIncomeRefetch((f) => f + 1)}
        />
      </Row>
    </Container>
  );
}
