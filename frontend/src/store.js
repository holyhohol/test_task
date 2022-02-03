import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import {
  userRegisterReducer,
  userLoginReducer,
} from "./redux/reducers/userReducers";

import {
  postListReducer,
  postUserListReducer,
  postCreateReducer,
  postDeleteReducer,
  postAnalyticReducer,
} from "./redux/reducers/postReducers";

import { adminUserActionsReducer, adminUsersListReducer } from "./redux/reducers/adminReducers";

const reducer = combineReducers({
  //post reducers
  postList: postListReducer,
  postUserList: postUserListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postAnalytic: postAnalyticReducer,
  //user reducers
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  //admin reducers
  adminUsersList: adminUsersListReducer,
  adminUserActions: adminUserActionsReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
