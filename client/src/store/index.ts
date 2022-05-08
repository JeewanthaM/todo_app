import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import rootReducer from "../store/reducers/index";

// export const store = () => {
//   const middlewareEnhancer = applyMiddleware(promiseMiddleware, ReduxThunk);
//    createStore(rootReducer, middlewareEnhancer);
// };

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(ReduxThunk, promiseMiddleware)
);
