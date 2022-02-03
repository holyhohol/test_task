import React, { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPostAnalytic } from "../redux/actions/postActions";
import { POST_ANALYTIC_RESET } from "../redux/constants/postConstants";
import DateChart from "../components/DateChart";
import DateRangePicker from "../components/DateRangePicker";
import { createSearchParams, useNavigate } from "react-router-dom";

function formatDateToSearch(date) {
  return date.toISOString().split("T")[0];
}

function PostAnalytics() {
  const params = useParams();

  const postId = params.id;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const postAnalytic = useSelector((state) => state.postAnalytic);
  const { loading, error, likes } = postAnalytic;

  const handleDateChange = (data) => {
    if (data.from && data.to) {
      const params = {
        date_from: data.from ? formatDateToSearch(data.from) : "",
        date_to: data.to ? formatDateToSearch(data.to) : "",
      };
      navigate({
        pathname: `/my-posts/analytics/${postId}`,
        search: `?${createSearchParams(params)}`,
      });
      dispatch(getPostAnalytic(postId, createSearchParams(params)));
    }
  };

  useEffect(() => {
    dispatch(getPostAnalytic(postId));
    return () => {
      dispatch({ type: POST_ANALYTIC_RESET });
    };
  }, [dispatch, postId]);

  return (
    <Container>
      <h1>Post Analytic</h1>

      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading || !likes ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          <>
            <Row className="d-flex justify-content-center">
              <DateRangePicker
                ranges={likes}
                onChange={(data) => handleDateChange(data)}
              />
            </Row>
            <DateChart
              chartData={likes.data}
              startDate={likes.date_from}
              endDate={likes.date_to}
            />
          </>
        )}
      </div>
    </Container>
  );
}

export default PostAnalytics;
