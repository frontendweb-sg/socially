import classNames from "classnames";
import { Align } from "@/utils/types";
import { FC } from "react";

/**
 * Form group component
 * @param param0
 * @returns
 */
interface IFormGropProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  align?: Align;
  label?: string;
}
const FormGroup: FC<IFormGropProps> = ({
  children,
  className,
  align,
  label,
  ...rest
}) => {
  const classes = classNames("form-group mb-3", "text-" + align, className);
  return (
    <div className={classes} {...rest}>
      {label && <label className="form-label">{label}</label>}
      {children}
    </div>
  );
};

export default FormGroup;
