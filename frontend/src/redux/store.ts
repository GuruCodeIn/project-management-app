import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { projectReducer } from "./reducers/projectReducer";
import { taskReducer } from "./reducers/taskReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer as any,
  applyMiddleware(thunk as any)
);

export default store;
