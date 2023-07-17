import { Status } from "@/utils/types";
import { combineReducer } from "./combine-reducer";
import { IAlert, alertReducer, alertState } from "./reducers/alert";

type Global<T> = {
  [Properties in keyof T]: T[keyof T];
};

type StoreProps = {
  alertState: IAlert;
};

export type Action<T, K> = {
  type: T;
  payload: K;
};

export type AppState = {
  state: {
    alertState: IAlert;
    editData: any;
  };
  dispatch: React.Dispatch<Reducer<StoreProps, Action<any, any>>>;
  editHandler: (data: any) => void;
  resetEditing: () => void;
  statusChangeHandler: (value: Status) => void;
};

export const AppState = {
  alertState: { message: "" },
};
export const reducer = combineReducer({ alertState: alertReducer });
export type AppDispatch = typeof reducer;
