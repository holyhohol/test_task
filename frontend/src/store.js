import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

import {
  postListReducer
} from './redux/reducers/postReducers'


const reducer = combineReducers({
  postList: postListReducer,
})

const initialState = {

};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
