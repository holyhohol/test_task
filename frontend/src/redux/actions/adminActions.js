import {
  ADMIN_USERS_LIST_REQUEST,
  ADMIN_USERS_LIST_SUCCESS,
  ADMIN_USERS_LIST_FAIL,
  ADMIN_USERS_LIST_RESET,
  ADMIN_USER_ACTIONS_REQUEST,
  ADMIN_USER_ACTIONS_SUCCESS,
  ADMIN_USER_ACTIONS_FAIL,
  ADMIN_USER_ACTIONS_RESET,
} from "../constants/adminConstants";
import axios from "axios";

export const listUsersAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USERS_LIST_REQUEST });

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
      `http://localhost:8000/api/users/all-users/`,
      config
    );

    dispatch({
      type: ADMIN_USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUserActionsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_ACTIONS_REQUEST });

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
      `http://localhost:8000/api/users/${id}/`,
      config
    );

    dispatch({
      type: ADMIN_USER_ACTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_ACTIONS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
