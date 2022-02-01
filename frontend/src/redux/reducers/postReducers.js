import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_RESET,
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
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };

    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.results,
        total_pages: action.payload.total_pages,
        links: action.payload.links,
        count: action.payload.count,
      };

    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };

    case POST_LIST_RESET:
      return { posts: [] };

    default:
      return state;
  }
};

export const postUserListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_USER_LIST_REQUEST:
      return { loading: true, posts: [] };

    case POST_USER_LIST_SUCCESS:
      return { loading: false, posts: action.payload };

    case POST_USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case POST_USER_LIST_RESET:
      return { posts: [] };

    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };

    case POST_CREATE_SUCCESS:
      return { loading: false, message: action.payload };

    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case POST_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };

    case POST_DELETE_SUCCESS:
      return { loading: false };

    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
