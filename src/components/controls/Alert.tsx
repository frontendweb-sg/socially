import Box from "./Box";
import classNames from "classnames";
import { forwardRef, memo } from "react";
import { IAlert } from "../store/slices/alert";

export interface AlertProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  alert: IAlert;
}
export type alertRef = HTMLDivElement;
const Alert = forwardRef<alertRef, AlertProps>(({ alert, ...rest }, ref) => {
  const classes = classNames({
    ["alert-" + alert.color]: alert.color,
    ["alert-" + alert.size]: alert.size,
    ["alert-" + alert.direction]: alert.direction,
  });
  return alert.visible ? (
    <Box ref={ref} className={classes}>
      {alert.message}
    </Box>
  ) : null;
});

export default memo(Alert);
