import { GET_PROJECTS, ADD_PROJECT, Project } from "../types";

interface Action {
  type: string;
  payload: any;
}

const initialState: Project[] = [];

export const projectReducer = (
  state = initialState,
  action: Action
): Project[] => {
  switch (action.type) {
    case GET_PROJECTS:
      return action.payload;

    case ADD_PROJECT:
      return [...state, action.payload];

    default:
      return state;
  }
};
