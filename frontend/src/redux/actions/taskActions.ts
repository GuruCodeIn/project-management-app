import axios from "axios";
import { Dispatch } from "redux";
import { GET_TASKS, ADD_TASK, COMPLETE_TASK } from "../types";

const API = "http://localhost:5001/api/tasks";

export const getTasks = (projectId: string) => async (dispatch: Dispatch) => {
  const res = await axios.get(`${API}/${projectId}`);

  dispatch({
    type: GET_TASKS,
    payload: res.data,
  });
};

export const addTask =
  (data: { title: string; projectId: string }) =>
  async (dispatch: Dispatch) => {
    const res = await axios.post(API, data);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  };

export const completeTask = (id: string) => async (dispatch: Dispatch) => {
  const res = await axios.patch(`${API}/${id}/complete`);

  dispatch({
    type: COMPLETE_TASK,
    payload: res.data,
  });
};
