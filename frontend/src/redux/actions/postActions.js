import axios from "axios";
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_USER_LIST_REQUEST,
  POST_USER_LIST_SUCCESS,
  POST_USER_LIST_FAIL,
  POST_USER_LIST_RESET,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_ANALYTIC_REQUEST,
  POST_ANALYTIC_SUCCESS,
  POST_ANALYTIC_FAIL,
  POST_ANALYTIC_RESET,
} from "../constants/postConstants";

export const listPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    page = page ? `?page=${page}` : ''

    const { data } = await axios.get(
      `http://localhost:8000/api/posts/${page}`
    );

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUserPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/api/posts/user-posts/`,
      config
    );

    dispatch({
      type: POST_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createPost = (postData) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8000/api/posts/`,
      postData,
      config
    );

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });

    setTimeout(() => {
      dispatch({ type: POST_CREATE_RESET });
    }, 5000);
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:8000/api/posts/${id}/`,
      config
    );

    dispatch({
      type: POST_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPostAnalytic = (id, dates='') => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_ANALYTIC_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/api/posts/analytic/${id}/?${dates}`,
      config
    );

    dispatch({
      type: POST_ANALYTIC_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: POST_ANALYTIC_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
