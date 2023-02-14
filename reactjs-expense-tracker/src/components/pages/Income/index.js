import React, { useState, useEffect } from "react";
// schema validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// importing container from bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// importing custom hooks
import { useQueryParams } from "../../../hooks/useQueryParams";
import { fetchCategoriesByType } from "../../../Apis/category";
import {
  createIncome,
  fetchIncomeById,
  updateIncome,
} from "../../../Apis/income";

// Giving validations to the Add Income Page 
const schema = yup.object({
  category: yup.string().required(),
  amount: yup.number().positive().required(),
  notes: yup.string().min(5).required(),
  income_date: yup.date().required(),
});

// Exporting function Income
export default function Income() {
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
      income_date: "",
    },
    mode: "all",
    reValidateMode: "all",
    resolver: yupResolver(schema),
  });
  const params = useQueryParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const editMode = !!params.incomeId;

//   Fetching the categories 
  useEffect(() => {
    fetchCategoriesByType("income")
      .then((response) => {
        setCategories(response.categorys);
        return editMode ? fetchIncomeById(params.incomeId) : null;
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

  console.log("[params]", params);

  // Setting the value as Category, amount, date and Description
  const patchDataToForm = (data) => {
    setValue("category", data.categoryId);
    setValue("amount", data.amount);
    setValue("income_date", data.income_date);
    setValue("notes", data.notes);
  };
  const hasError = (control) => {
    return errors[control] && (touchedFields[control] || dirtyFields[control]);
  };

  // On submit Handler
  function onSubmitHandler(value) {
    console.log(value);
    let api;
    if (editMode) {
      api = updateIncome({
        _id: params.incomeId,
        amount: value.amount,
        categoryid: value.category,
        income_date: value.income_date.toISOString(),
        notes: value.notes,
      });
    } else {
      api = createIncome({
        amount: value.amount,
        categoryid: value.category,
        income_date: value.income_date.toISOString(),
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
            {editMode ? "Edit Income" : "Add Income"}
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
              <Form.Label>Income Date</Form.Label>
              <Form.Control
                type="date"
                {...register("income_date")}
                placeholder="Enter Amount"
                isInvalid={hasError("income_date")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.income_date?.message}
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
