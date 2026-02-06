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
      return Array.isArray(action.payload) ? action.payload : state;

    case ADD_TASK:
      if (!action.payload) return state;
      return [...state, action.payload];

    case COMPLETE_TASK:
      
      if (!action.payload || !action.payload._id) {
        return state;
      }

      return state.map((t) =>
        t._id === action.payload._id
          ? { ...t, completed: true }
          : t
      );

    default:
      return state;
  }
};
