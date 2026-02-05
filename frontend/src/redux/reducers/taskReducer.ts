import { GET_TASKS, ADD_TASK, COMPLETE_TASK, Task } from "../types";

interface Action {
  type: string;
  payload: any;
}

const initialState: Task[] = [];

export const taskReducer = (
  state = initialState,
  action: Action
): Task[] => {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    case ADD_TASK:
      return [...state, action.payload];

    case COMPLETE_TASK:
      return state.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );

    default:
      return state;
  }
};
