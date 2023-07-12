import classNames from "classnames";
import { FC } from "react";
import type { IconType } from "react-icons";
import { getError } from "@/utils/get-error";

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  startIcon?: IconType;
  endIcon?: IconType;
  errors?: object;
  touched?: object;
}

const Textarea: FC<ITextareaProps> = ({
  name,
  value,
  cols,
  rows,
  errors,
  touched,
  startIcon,
  className,
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
  return (
    <div className="form-group">
      <div className={classes}>
        {startIcon && <StartIcon className="me-2" />}
        <textarea
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
};

Textarea.defaultProps = {
  rows: 5,
};
export default Textarea;
