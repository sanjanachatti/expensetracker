import React, { useState, useEffect } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// custom hooks
import { useQueryParams } from "../../../hooks/useQueryParams";
import { fetchCategoriesByType } from "../../../Apis/category";
import {
  createExpense,
  fetchExpenseById,
  updateExpense,
} from "../../../Apis/expense";

const schema = yup.object({
  category: yup.string().required(),
  amount: yup.number().positive().required(),
  notes: yup.string().min(5).required(),
  expense_date: yup.date().required(),
});

export default function Expense() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields, dirtyFields },
    setValue,
  } = useForm({
    defaultValues: {
      category: "",
      amount: 0,
      notes: "",
      expense_date: "",
    },
    mode: "all",
    reValidateMode: "all",
    resolver: yupResolver(schema),
  });
  const params = useQueryParams();
  const navigate = useNavigate();
  console.log("[params]", params);

  const [categories, setCategories] = useState([]);
  const editMode = !!params.expenseId;

  useEffect(() => {
    fetchCategoriesByType("expense")
      .then((response) => {
        setCategories(response.categorys);
        return editMode ? fetchExpenseById(params.expenseId) : null;
      })
      .then((response) => {
        if (response) {
          patchDataToForm(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, []);

  const patchDataToForm = (data) => {
    setValue("category", data.categoryId);
    setValue("amount", data.amount);
    setValue("expense_date", data.expense_date);
    setValue("notes", data.notes);
  };

  const hasError = (control) => {
    return errors[control] && (touchedFields[control] || dirtyFields[control]);
  };

  function onSubmitHandler(value) {
    console.log(value);
    let api;
    if (editMode) {
      api = updateExpense({
        _id: params.expenseId,
        amount: value.amount,
        categoryid: value.category,
        expense_date: value.expense_date.toISOString(),
        notes: value.notes,
      });
    } else {
      api = createExpense({
        amount: value.amount,
        categoryid: value.category,
        expense_date: value.expense_date.toISOString(),
        notes: value.notes,
      });
    }
    api
      .then((response) => {
        console.log(response);
        if (!response.error) {
          toast.success(response.message);
          navigate("/dashboard");
        } else {
          toast.error(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container fluid>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={10} sm={8} md={6} lg={4} className="shadow rounded-lg p-4">
          <h4 className="text-center">
            {editMode ? "Edit Expense" : "Add Expense"}
          </h4>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group controlId="categoryControl">
              <Form.Label>Category</Form.Label>
              <Form.Control
                {...register("category")}
                isInvalid={hasError("category")}
                as="select"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="amountControl">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                {...register("amount")}
                placeholder="Enter Amount"
                isInvalid={hasError("amount")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="dateControl">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control
                type="date"
                {...register("expense_date")}
                isInvalid={hasError("expense_date")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expense_date?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="notesControl">
              <Form.Label>Notes</Form.Label>
              <textarea
                className={`form-control ${
                  hasError("notes") ? "is-invalid" : ""
                }`}
                {...register("notes")}
                placeholder="Enter Notes"
              ></textarea>
              <Form.Control.Feedback type="invalid">
                {errors.notes?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="success"
              className="mt-4 btn-block"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
