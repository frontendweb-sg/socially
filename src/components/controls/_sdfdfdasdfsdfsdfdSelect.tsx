import { memo, forwardRef } from "react";
import Box from "./Box";
import classNames from "classnames";

type Props<T> = SffSelectProps<T> &
  React.SelectHTMLAttributes<HTMLSelectElement> & {};
export type selectRef = HTMLSelectElement;
const Select = forwardRef(
  <T extends unknown>(
    {
      name,
      defaultValues,
      options,
      getOptionLabel = (option: any) => option.label,
      keyExtractor,
      setValues,
      className,
      ...rest
    }: Props<T>,
    ref: React.Ref<selectRef>
  ) => {
    const classes = classNames("form-control", className);

    return (
      <Box className={classes}>
        <select className="fw-input" name={name} {...rest}>
          {options.map((option: T, index: number) => (
            <option key={getOptionLabel?.(option) ?? index}>
              {getOptionLabel?.(option)}
            </option>
          ))}
        </select>
      </Box>
    );
  }
);

export default memo(SffSelectProps) as typeof Select;
