import axios from "axios";
import { Dispatch } from "redux";
import { GET_PROJECTS, ADD_PROJECT } from "../types";

const API = "http://localhost:5001/api/projects";

export const getProjects = () => async (dispatch: Dispatch) => {
  const res = await axios.get(API);

  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const addProject =
  (data: { name: string; description: string }) =>
  async (dispatch: Dispatch) => {
    const res = await axios.post(API, data);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });
  };
