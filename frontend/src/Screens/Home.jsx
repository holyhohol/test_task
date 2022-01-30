import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { Row, Container, Spinner, Alert } from "react-bootstrap";
import { listPosts } from "../redux/actions/postActions";
import { POST_LIST_RESET } from "../redux/constants/postConstants";

function Home() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { error, loading, posts } = postList;

  useEffect(() => {
    console.log("effect");
    dispatch(listPosts());

    return () => {
      dispatch({ type: POST_LIST_RESET });
    };
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <h1>Posts</h1>
      </Row>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              title={post.title}
              text={post.text}
              user="some user"
              createdAt={post.created_at}
              likesCount={post.likes}
            />
          );
        })
      )}
    </Container>
  );
}

export default Home;
