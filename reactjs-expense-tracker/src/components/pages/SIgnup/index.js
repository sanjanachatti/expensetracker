import React from "react";
// yup is a schema validator, and also provides nice error messages with yup resolver
import * as yup from "yup"; 
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// Package used for forms in React
import { useForm } from "react-hook-form"; //forms in react
import { yupResolver } from "@hookform/resolvers/yup";
// Toastify for nice toasts
import { toast } from "react-toastify";

// apis
import { signup } from "../../../Apis/auth";

// Validations Schema
const schema = yup.object({
  // Validation: must be a string and has 6 characters
  username: yup.string().min(6).required(),
  // Validation: Should be an email
  email: yup.string().email().required(),
  // Validation: must be a string and has 8 characters
  password: yup.string().min(8).required(),
  // Validation: Confirm password must match password, yup.ref used
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("confirm password is required"),
});

export default function Signup() {
  const {
    register,
    // To handle the submit event of the form
    handleSubmit,
    // 4 fields:
    // valid: to see if our form is valid after applying all the validations
    // errors: represent errors of the form
    // touchedFields: When you tap in a field and come out 
    // dirtyFields: when you type in a field and come out
    formState: { isValid, errors, touchedFields, dirtyFields },
    reset,
    // Use form hook
    // To give field like username, email, password and confirm password
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // We need to update form when value changes
    mode: "all",
    reValidateMode: "all",
    // Mapping a schema to the particular form, to get the messages to the form
    resolver: yupResolver(schema), 
  });

// checking the controls    
  const hasError = (control) => {
    return errors[control] && (touchedFields[control] || dirtyFields[control]);
  };

//   On submit handler
  const onSubmitHandler = (value) => {
    //   Logging the value from the form
    console.log(value);
    if (!isValid) {
      return;
    }
    // Signup function to call the api
    // If no error from the api, user is created succesfully
    signup(value.username, value.email, value.password)
      .then((data) => {
        if (!data.error) {
          toast.success("user created successfully");
          reset();
          // else showing the error toaster
        } else {
          toast.error(data.message);
        }
      })
      // Catching the error, like 404 page not found
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    //   Adding all the styling to the center, so form looks good
    <Container fluid>
      <Row
        // Importing center bootstrap
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={10} sm={8} md={6} lg={4} className="shadow rounded-lg p-4">
          <h4 className="text-center">Sign Up</h4>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
              {/* Control id to improve the DOM experience */}
            <Form.Group controlId="usernameControl">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                // Connects particular control to username in the form
                {...register("username")}
                placeholder="Enter username"
                // If hasError is true, error message will be displayed
                isInvalid={hasError("username")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="emailControl">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // Connects particular control to email in the form
                {...register("email")}
                placeholder="Enter email"
                // If hasError is true, error message will be displayed
                isInvalid={hasError("email")}
              />
              
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="passwordControl">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                // Connects particular control to password in the form
                {...register("password")}
                placeholder="Enter Password"
                // If hasError is true, error message will be displayed
                isInvalid={hasError("password")}
              />
              <Form.Control.Feedback type="invalid">
                  
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPasswordControl">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                // Connects particular control to confirm password in the form
                {...register("confirmPassword")}
                placeholder="Enter Confirm Password"
                // If hasError is true, error message will be displayed
                isInvalid={hasError("confirmPassword")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {/* A signup button */}
            <Button
              variant="success"
              className="mt-4 btn-block"
              type="submit"
              disabled={!isValid}
            >
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
