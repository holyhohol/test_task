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

export const adminUsersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USERS_LIST_REQUEST:
      return { loading: true, users: [] };

    case ADMIN_USERS_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case ADMIN_USERS_LIST_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_USERS_LIST_RESET:
      return { posts: [] };

    default:
      return state;
  }
};

export const adminUserActionsReducer = (state = { actions: [] }, action) => {
    switch (action.type) {
      case ADMIN_USER_ACTIONS_REQUEST:
        return { loading: true, actions: [] };
  
      case ADMIN_USER_ACTIONS_SUCCESS:
        return {
          loading: false,
          actions: action.payload,
        };
  
      case ADMIN_USER_ACTIONS_FAIL:
        return { loading: false, error: action.payload };
  
      case ADMIN_USER_ACTIONS_RESET:
        return { actions: [] };
  
      default:
        return state;
    }
  };