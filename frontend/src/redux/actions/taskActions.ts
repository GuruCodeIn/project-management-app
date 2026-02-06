import axios from "axios";
import { Dispatch } from "redux";
import { GET_TASKS, ADD_TASK, COMPLETE_TASK } from "../types";

const API = "/api/tasks";

axios.defaults.withCredentials = false;

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
    const res = await axios.post(API, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  };


export const completeTask = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.request({
      url: `${API}/${id}/complete`,
      method: "PATCH",
      data: {},
      headers: {
        Accept: "application/json",
      },
    });

    dispatch({
      type: COMPLETE_TASK,
      payload: res.data,
    });

  } catch (err: any) {
    console.log("❌ COMPLETE TASK ERROR:", err);
    alert("Complete Task Failed: " + err.message);
  }
};


