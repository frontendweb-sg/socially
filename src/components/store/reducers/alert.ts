import { Color, Direction, Size } from "@/utils/types";
import { Action, AppState, IAppState } from "..";

export enum AlertActionType {
  ALERT_SHOW = "ALERT SHOW",
  ALERT_HIDE = "ALERT HIDE",
}

export type IAlert = {
  message: string;
  visible?: boolean;
  size?: Size;
  direction?: Direction;
  color?: Color;
};

export const alertState: IAlert = {
  visible: false,
  message: "",
  color: "primary",
  size: "sm",
  direction: "top-right",
};

const alertShow = (
  dispatch: Function,
  payload: IAlert,
  time: number = 3000
) => {
  dispatch({ type: AlertActionType.ALERT_SHOW, payload });
  // setTimeout(() => {
  //   dispatch({ type: AlertType.ALERT_HIDE });
  // }, time);
};
const alertHide = (dispatch: Function, payload?: IAlert) => {
  dispatch({ type: AlertActionType.ALERT_HIDE, payload });
};

const reducer = (
  state: IAppState = AppState,
  action: Action<AlertActionType, IAlert>
) => {
  switch (action.type) {
    case AlertActionType.ALERT_SHOW:
      return {
        ...state.alertState,
        ...action.payload,
        visible: true,
      };
    case AlertActionType.ALERT_HIDE:
      return {
        ...state.alertState,
        message: "",
        visible: false,
      };
    default:
      return state;
  }
};

export { reducer as alertReducer };
export const alertAction = {
  alertShow,
  alertHide,
};
