import axios from "axios";
import { ActionType } from "./types";

export async function getTodos() {
  const request = await axios.get(`http://localhost:4000/todos/get`);

  return {
    type: ActionType.GET_TODOS,
    payload: request,
  };
}

export async function createTodo(data: any) {
  const request = await axios.post(`http://localhost:4000/todos/create`, data);

  return {
    type: ActionType.CREATE_TODO,
    payload: request,
  };
}

export async function changeStatus(data: any) {
  let dataToSubmit = {
    title: data.title,
    description: data.description,
    status: data?.status === "1" ? 0 : 1,
    endDate: data.endDate,
  };
  const request = await axios.patch(
    `http://localhost:4000/todos/update/${data._id}`,
    dataToSubmit
  );

  return {
    type: ActionType.CHANGE_STATUS,
    payload: request,
  };
}

export async function deleteTodo(data: any) {
  const request = await axios.delete(
    `http://localhost:4000/todos/delete/${data._id}`
  );

  return {
    type: ActionType.DELETE_TODO,
    payload: request,
  };
}
