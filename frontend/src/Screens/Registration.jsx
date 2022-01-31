import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/userActions";

function Registration() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <Container>
      <h1>Registration</h1>
      <div style={{ padding: "0 10rem" }}>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("firstName", { required: true })} />
                {errors.firstName && (
                  <span className="form__error">This field is required</span>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control {...register("lastName", { required: true })} />
                {errors.lastName && (
                  <span className="form__error">This field is required</span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="form__error">This field is required</span>
              )}
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="form__error">This field is required</span>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: {
                      matchesPassword: (value) => {
                        const { password } = getValues();
                        return password === value;
                      },
                    },
                  })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <span className="form__error">This field is required</span>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "matchesPassword" && (
                    <span className="form__error">Passwords should match</span>
                  )}
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Registration;
