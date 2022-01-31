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
} from "../constants/postConstants";

export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get(`http://localhost:8000/api/posts/`);

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

    const {data} = await axios.post(`http://localhost:8000/api/posts/`, postData, config) 

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
