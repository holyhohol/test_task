import React, { useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {createPost} from '../redux/actions/postActions'


function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postCreate = useSelector((state) => state.postCreate);
  const {error, loading, message} = postCreate

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const submitHandler = (data) => {
    dispatch(createPost(data))
  };

  return (
    <Container>
      <h1>Create Your Post</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant='success'>{message.detail}</Alert>}
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register("title", { required: true, maxLength: 255 })}
          />
          {errors.title && errors.title.type === "required" && (
            <span className="form__error">This field is required</span>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <span className="form__error">Max 255 symbols</span>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control as='textarea' style={{ height: '300px' }} {...register("text", { required: true })} />
          {errors.title && errors.title.type === "required" && (
            <span className="form__error">This field is required</span>
          )}
        </Form.Group>
        <Button type="submit" className="mt-3">
            Create Post
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePost;
