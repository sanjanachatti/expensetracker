import React from "react";
// yup is a schema validator, and also provides nice error messages with yup resolver
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// Conatiner to show the Login fields in proper format
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// Package used for forms in React
import { useForm } from "react-hook-form";
// For nice toast messages
import { toast } from "react-toastify";
// Importing Hooks
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Imported actions
import { setAuth } from "../../../states/auth.state";
// Imported apis 
import { login } from "../../../Apis/auth";

// Giving Validations as Email 
const schema = yup.object({
  email: yup.string().email().required(),
  // Validation: Password should be 8 characters
  password: yup.string().min(8).required(),
});

//Exporting function login
export default function Login() {
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
    // Use form hook
    // To give field like  email and password 
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    reValidateMode: "all",
    resolver: yupResolver(schema),
  });

  // Hooks 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // checking the controls  
  const hasError = (control) => {
    return errors[control] && (touchedFields[control] || dirtyFields[control]);
  };

  // On submit handler
  const onSubmitHandler = (value) => {
    console.log(value);
    if (!isValid) {
      return;
    }
    login(value.email, value.password)
      .then((data) => {
        console.log(data);
        // If else: On login, if token matches, then user is authenticated
        if (!data.error) {
          const token = data.accessToken;
          sessionStorage.setItem("token", token);
          dispatch(setAuth({ token }));
          navigate("/dashboard");
        //   else error msg
        } else {
          toast.error(data.message);
        }
      })
      // Error catched
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid>
      <Row
        // Importing center bootstrap
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={10} sm={8} md={6} lg={4} className="shadow rounded-lg p-4">
          <h4 className="text-center">Login</h4>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
              {/* Control id to improve the DOM experience */}
              {/* Same as Sing up */}
            <Form.Group controlId="emailControl">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                placeholder="Enter email"
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
                {...register("password")}
                placeholder="Password"
                isInvalid={hasError("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Submit button */}
            <Button
              variant="success"
              className="mt-4 btn-block"
              type="submit"
              disabled={!isValid}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
