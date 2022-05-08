import { ActionType } from "./types"

interface GetTodosAction {
    type: ActionType.GET_TODOS,
    payload: any
}

interface IsLoadingAction {
    type: ActionType.IS_LOADING,
    payload: boolean
}



export type Action = GetTodosAction | IsLoadingAction ;