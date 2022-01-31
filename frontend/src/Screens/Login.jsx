import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error: loginError, userInfo } = userLogin;

  useEffect(() => {
      if(userInfo){
          navigate('/')
      }
  }, [userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLogin = (data) => {
    dispatch(login(data))
  };

  return (
    <Container>
      <h1>Login</h1>
      {loginError && <Alert variant='danger'>{loginError}</Alert>}
      <Form onSubmit={handleSubmit(submitLogin)}>
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
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
