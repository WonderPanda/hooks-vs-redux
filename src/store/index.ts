import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { reportReducer, ReportState, ReportActions } from "./reports";

export type AppState = {
  report: ReportState;
};

export type AppActions = ReportActions;

// Combine all the various reducers...

const rootReducer = combineReducers<AppState, AppActions>({
  report: reportReducer
});

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));
