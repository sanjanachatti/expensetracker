import React from "react";

import { Col, ListGroup, Row, Spinner } from "react-bootstrap";

import AmountItem from "../../UI/AmountItem";

// custom hooks
import { useFetch } from "../../../hooks/useFetch";
import { useNavigateParams } from "../../../hooks/useNavigateParams";
import { deleteIncome, fetchIncome } from "../../../Apis/income";

//function for Income List
export default function IncomeList({ refetch, onChange }) {
  const { data: response, loading, error } = useFetch(fetchIncome, [refetch]);
  const navigate = useNavigateParams();
  console.log(response, error);
  function onEditIncomeHandler(id) {
    navigate("/income", `incomeId=${id}`);
  }

  // func to delete the income list
  function onDeleteIncomeHandler(id) {
    deleteIncome(id).then(() => {
      onChange();
    });
  }
//   The UI of the Income list
  return (
    <Col className="p-3 col-12 col-sm-5">
      <h4 className="text-center">Incomes</h4>
      <ListGroup
        style={{ height: "400px", overflowY: "scroll" }}
        className="px-3"
      >
        {!loading && response ? (
          response.data.map((income) => (
            <AmountItem
            // All the functions present in a income list card
              key={income._id}
              id={income._id}
              category={income.category}
              amount={income.amount}
              date={income.date}
              notes={income.notes}
              onEdit={onEditIncomeHandler}
              onDelete={onDeleteIncomeHandler}
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
