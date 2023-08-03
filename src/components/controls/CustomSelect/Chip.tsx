import Box from "../Box";
import { memo } from "react";
import { FaTimes } from "react-icons/fa";

type Props<T> = {
  label: string;
  onRemove: (ev?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Chip = <T extends unknown>({ label, onRemove }: Props<T>) => {
  return (
    <button className="select-chip" onClick={onRemove}>
      {label}
      <FaTimes className="ms-2" />
    </button>
  );
};
export default memo(Chip) as typeof Chip;
