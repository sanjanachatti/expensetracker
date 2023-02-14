// Amount card lopped 3 times t show Income, Expenses and Savings
import React from "react";
// The Col lets you specify column widths 
import { Col } from "react-bootstrap";

// Exporting reuable function
export default function AmountCard({ amount, title }) {
  return (
    // Used in Income, Expense and Total card displayed in dashboard
    // Adding classnames for those cards importing from bootstrap
    <Col className="shadow rounded-lg border p-3 col-10 col-sm-3 col-md-3 col-lg-3 mt-3 mb-2 mx-3 ">
      <h5 className="text-center">{title}</h5>
      <h4 className="text-center text-secondary">{amount}</h4>
    </Col>
  );
}
