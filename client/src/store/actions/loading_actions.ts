import { ActionType } from "./types";

export async function isLoading(value: boolean) {
  return {
    type: ActionType.IS_LOADING,
    payload: value,
  };
}
