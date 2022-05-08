import { combineReducers } from "redux";
import todo from "./todo_reducer";
import loading from "./loading_reducer";

const rootReducer = combineReducers({
  todo,
  loading
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
