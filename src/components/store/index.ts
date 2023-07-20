import { Status } from "@/utils/types";
import { combineReducer } from "./combine-reducer";
import { IAlert, alertReducer, alertState } from "./reducers/alert";
import { IConfirm } from "@/hooks/useConfirmation";
import type { SkillState } from "./reducers/skill";

type Global<T> = {
  [Properties in keyof T]: T[keyof T];
};

type StoreProps = {
  alertState: IAlert;
  skillState: SkillState;
};

export type Action<T, K> = {
  type: T;
  payload: K;
};

export type AppState = {
  state: {
    alertState: IAlert;
    skillState: SkillState;
    editData: any;
    confirm: IConfirm;
  };
  dispatch: React.Dispatch<Reducer<StoreProps, Action<any, any>>>;
  editHandler: (data: any) => void;
  resetEditing: () => void;
  statusChangeHandler: (value: Status) => void;
  onCancelConfirm: () => void;
  onConfirm: (data: IConfirm) => void;
};

export const AppState = {
  alertState: {},
  skillState: {},
};
export const reducer = combineReducer({ alertState: alertReducer });
export type AppDispatch = typeof reducer;
