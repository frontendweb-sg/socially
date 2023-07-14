import { combineReducer } from "./combine-reducer";
import { IAlert, alertReducer, alertState } from "./reducers/alert";

export interface IAppState {
  alertState: IAlert;
}

export type Action<T, K> = {
  type: T;
  payload: K;
};

export const AppState: IAppState = { alertState };
export const reducer = combineReducer({ alertState: alertReducer });
export type AppDispatch = typeof reducer;
