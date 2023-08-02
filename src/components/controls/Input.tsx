import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef, ReactElement, useRef } from "react";
import { upperFirst } from "lodash";
import { getError } from "@/utils/get-error";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  errors?: object;
  touched?: object;
}

export type inputRef = HTMLInputElement;
const Input = forwardRef<inputRef, IProps>(
  (
    {
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
    },
    ref
  ) => {
    const error = getError(name!, errors!, touched!);
    const classes = classNames(
      "form-control",
      {
        "is-valid": touched?.[name as keyof typeof touched],
        "is-invalid": error,
      },
      className
    );

    return (
      <>
        <div className={classes}>
          {startIcon}
          <input
            value={value}
            name={name}
            className="fw-input"
            ref={ref}
            placeholder={placeholder ?? upperFirst(name) + " :"}
            {...rest}
          />
          {endIcon}
          {children}
        </div>
        {error && <span className="invalid-feedback">{error}</span>}
      </>
    );
  }
);

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Input;
