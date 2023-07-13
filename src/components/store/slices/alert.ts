import { Color, Direction, Size } from "@/utils/types";
import { AppState, IAppState } from "..";

export enum AlertType {
  ALERT_SHOW = "ALERT SHOW",
  ALERT_HIDE = "ALERT HIDE",
}

export type IAlert = {
  visible?: boolean;
  message: string;
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

export type AlertAction = { type: AlertType; payload: IAlert };

const alertShow = (
  dispatch: Function,
  payload: IAlert,
  time: number = 3000
) => {
  dispatch({ type: AlertType.ALERT_SHOW, payload });
  setTimeout(() => {
    dispatch({ type: AlertType.ALERT_HIDE });
  }, time);
};
const alertHide = (dispatch: Function, payload: IAlert) => {
  dispatch({ type: AlertType.ALERT_HIDE, payload });
};

const reducer = (state: IAppState = AppState, action: AlertAction) => {
  switch (action.type) {
    case AlertType.ALERT_SHOW:
      return {
        ...state.alertState,
        ...action.payload,
        visible: true,
      };
    case AlertType.ALERT_HIDE:
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
