import Box from "./Box";
import classNames from "classnames";
import { forwardRef, memo } from "react";
import { IAlert } from "../store/reducers/alert";

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

    return alert.visible ? (
      <Box ref={ref} className={classes} role="alert">
        <Box className="d-flex justify-content-between align-items-center">
          {alert.message}
          {children}
        </Box>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </Box>
    ) : null;
  }
);

export default memo(Alert);
