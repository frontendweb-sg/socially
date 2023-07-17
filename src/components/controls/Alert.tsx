import Box from "./Box";
import classNames from "classnames";
import { forwardRef, memo, useContext } from "react";
import { IAlert, alertAction } from "../store/reducers/alert";
import { AppContext, useAppState } from "../providers/AppProvider";

export interface AlertProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  alert: IAlert;
}
export type alertRef = HTMLDivElement;
const Alert = forwardRef<alertRef, AlertProps>(
  ({ children, alert, ...rest }, ref) => {
    const classes = classNames("alert alert-dismissible", {
      ["alert-" + alert.color]: alert.color,
      ["alert-" + alert.size]: alert.size,
      ["alert-" + alert.direction]: alert.direction,
    });

    const { dispatch } = useAppState();

    return alert.visible ? (
      <Box ref={ref} className={classes} role="alert">
        {children ? children : alert.message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => alertAction.alertHide(dispatch)}
        ></button>
      </Box>
    ) : null;
  }
);

export default memo(Alert);
