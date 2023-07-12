import classNames from "classnames";
import PropTypes from "prop-types";
import { FC } from "react";
import { upperFirst } from "lodash";
import type { IconType } from "react-icons";
import { getError } from "@/utils/get-error";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: IconType;
  endIcon?: IconType;
  errors?: object;
  touched?: object;
}
const Input: FC<IProps> = ({
  value,
  name,
  className,
  startIcon,
  endIcon,
  errors,
  touched,
  children,
  placeholder,
  ...rest
}) => {
  const error = getError(name!, errors!, touched!);
  const classes = classNames(
    "form-control",
    {
      "is-valid": touched?.[name as keyof typeof touched],
      "is-invalid": error,
    },
    className
  );
  const StartIcon = startIcon!;
  const EndIcon = endIcon!;
  return (
    <>
      <div className={classes}>
        {startIcon && <StartIcon className="me-2" />}
        <input
          value={value}
          name={name}
          className="fw-input"
          placeholder={placeholder ?? upperFirst(name) + " :"}
          {...rest}
        />
        {children}
        {endIcon && <EndIcon className="ms-2" />}
      </div>
      {error && <span className="invalid-feedback">{error}</span>}
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Input;