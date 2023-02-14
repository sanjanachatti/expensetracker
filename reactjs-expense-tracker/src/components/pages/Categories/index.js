import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Container,
  Modal,
  Form,
  ListGroup,
  Spinner,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import PencilIcon from "@heroicons/react/solid/PencilIcon";
import XIcon from "@heroicons/react/solid/XIcon";

// apis
import { createCategory, fetchCategories } from "../../../Apis/category";
// custom hooks
import { useFetch } from "../../../hooks/useFetch";

const IconStyles = {
  height: 20,
  width: 20,
  cursor: "pointer",
  marginRight: "5px",
};

const schema = yup.object({
  category_name: yup
    .string()
    .min(3, "category name must be at least 3 characters")
    .required(),
  category_type: yup.string().oneOf(["expense", "income"]),
});

export default function Categories() {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState(0);

  const {
    register,
    formState: { isValid, errors, touchedFields, dirtyFields },
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      category_name: "",
      category_type: "expense",
    },
    mode: "all",
    reValidateMode: "all",
    resolver: yupResolver(schema),
  });

  const { data, error, loading } = useFetch(fetchCategories, [created]);

  console.log(data, error, loading);

  const hasError = (control) => {
    return errors[control] && (touchedFields[control] || dirtyFields[control]);
  };

  function onAddCategoryHandler() {
    reset();
    setEditMode(false);
    setOpen(true);
  }

  function onEditCategoryHandler(category) {
    reset();
    setEditMode(true);
    setOpen(true);
    setValue("category_name", category.category_name, {});
    setValue("category.category_type", category.category_type, {});
  }

  function onDeleteCategoryHandler(category) {}

  function onCancelHandler() {
    setOpen(false);
  }

  function onSubmitHandler() {
    const value = getValues();
    console.log(value);
    if (!isValid) {
      return;
    }
    createCategory(value.category_name, value.category_type)
      .then((data) => {
        if (!data.error) {
          toast.success(data.message);
          setOpen(false);
          setCreated(created + 1);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Container fluid style={{ marginTop: "70px" }}>
        <Button variant="success" onClick={onAddCategoryHandler}>
          Add Category
        </Button>
        <hr />
        {loading || !data ? (
          <Row className="justify-content-center">
            <Spinner
              as="span"
              animation="border"
              size="md"
              variant="info"
              role="status"
            />
          </Row>
        ) : (
          <ListGroup>
            {data.categorys.map((category) => (
              <ListGroup.Item key={category._id}>
                {category.category_name} {"  "} ({category.category_type})
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit a Category" : "Add  a Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryControl">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                {...register("category_name")}
                placeholder="Enter Category"
                isInvalid={hasError("category_name")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category_name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="typeControl">
              <Form.Check
                type="radio"
                value="expense"
                id="expense"
                label="Expense"
                inline
                {...register("category_type")}
              />
              <Form.Check
                type="radio"
                value="income"
                id="income"
                label="Income"
                inline
                {...register("category_type")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!isValid}
            onClick={onSubmitHandler}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

{
  /* <div
style={{
  display: "inline-block",
  position: "absolute",
  right: 1,
}}
>
<PencilIcon
  style={IconStyles}
  onClick={() => onEditCategoryHandler(category)}
/>
<XIcon
  style={IconStyles}
  onClick={() => onDeleteCategoryHandler(category)}
/>
</div> */
}
