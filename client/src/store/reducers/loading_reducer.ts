import { ActionType } from "../actions/types";
import { Action } from "../actions/index";

const loadingReducer = (state = {} as any, action: Action): any => {
  switch (action.type) {
    case ActionType.IS_LOADING:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};

export default loadingReducer;
