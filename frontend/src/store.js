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
  postDeleteReducer
} from "./redux/reducers/postReducers";

const reducer = combineReducers({
  //post reducers
  postList: postListReducer,
  postUserList: postUserListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  //user reducers
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
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
