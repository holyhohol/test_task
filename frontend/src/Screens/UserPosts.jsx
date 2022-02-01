import React, { useEffect } from "react";
import { Alert, Container, Spinner, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { POST_USER_LIST_RESET } from "../redux/constants/postConstants";
import { deletePost, listUserPosts } from "../redux/actions/postActions";
import Post from "../components/Post";
import { faTrashAlt, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserPosts() {
  const dispatch = useDispatch();

  const postUserList = useSelector((state) => state.postUserList);
  const { loading, error, posts } = postUserList;

  useEffect(() => {
    dispatch(listUserPosts());

    return () => {
      dispatch({ type: POST_USER_LIST_RESET });
    };
  }, [dispatch]);

  const deletePostHandler = async (id) => {
    await dispatch(deletePost(id));
    dispatch(listUserPosts());
  };

  return (
    <Container>
      <h1>My Posts</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Post postData={post} />

              <Button className="mt-3 ms-0">
                <FontAwesomeIcon icon={faChartBar} className="me-1" />
                View Statistic
              </Button>
              <Button
                onClick={() => deletePostHandler(post.id)}
                variant="danger"
                className="mt-3 ms-3"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-1" />
                Delete Post
              </Button>
            </div>
          );
        })
      )}
    </Container>
  );
}

export default UserPosts;
