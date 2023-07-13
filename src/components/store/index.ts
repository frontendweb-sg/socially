import { combineReducer } from "./combine-reducer";
import { IAlert, alertReducer, alertState, AlertType } from "./slices/alert";

export interface IAppState {
  alertState: IAlert;
}

export type Action = {
  type: AlertType;
  payload: IAlert;
};

export const AppState: IAppState = { alertState };
export const reducer = combineReducer({ alertState: alertReducer });
export type AppDispatch = typeof reducer;
