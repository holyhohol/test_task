import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import Pages from "../components/Pages";
import { Row, Container, Spinner, Alert } from "react-bootstrap";
import { listPosts } from "../redux/actions/postActions";
import { POST_LIST_RESET } from "../redux/constants/postConstants";
import { useSearchParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");

  const postList = useSelector((state) => state.postList);
  const {
    error,
    loading,
    posts,
    links,
    total_pages: totalPages,
    count,
  } = postList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listPosts(page));

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
              postData={post}
              user={{ id: userInfo?.id, token: userInfo?.token }}
            />
          );
        })
      )}

      {links && <Pages links={links} totalPages={totalPages} currentPage={page} />}
    </Container>
  );
}

export default Home;
