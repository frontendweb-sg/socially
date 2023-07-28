import classNames from "classnames";
import { FC, forwardRef } from "react";
import type { IconType } from "react-icons";
import { getError } from "@/utils/get-error";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  startIcon?: IconType;
  endIcon?: IconType;
  errors?: object;
  touched?: object;
};

export type textareaRef = HTMLTextAreaElement;
const Textarea = forwardRef<textareaRef, TextareaProps>(
  (
    {
      name,
      value,
      cols,
      rows = 3,
      errors,
      touched,
      startIcon,
      className,
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

    const StartIcon = startIcon!;
    return (
      <div className="form-group">
        <div className={classes}>
          {startIcon && <StartIcon className="me-2" />}
          <textarea
            ref={ref}
            className="fw-textarea"
            rows={rows}
            cols={cols}
            name={name}
            value={value}
            {...rest}
          />
        </div>
        {error && <span className="invalid-feedback">{error}</span>}
      </div>
    );
  }
);

export default Textarea;
