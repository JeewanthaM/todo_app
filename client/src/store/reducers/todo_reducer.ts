import { ActionType } from "../actions/types";
import { Action } from "../actions/index";

const reducer = (state = {} as any, action: Action): any => {
  switch (action.type) {
    case ActionType.GET_TODOS:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default reducer;
