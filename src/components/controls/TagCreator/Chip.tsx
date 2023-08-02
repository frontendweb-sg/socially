import Box from "../Box";
import { memo } from "react";
import { FaTimes } from "react-icons/fa";

type Props<T> = {
  label: string;
  onRemove: (ev?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Chip = <T extends unknown>({ label, onRemove }: Props<T>) => {
  return (
    <Box className="badge chip rounded-pill me-2">
      {label}
      <button className="ms-2" onClick={onRemove}>
        <FaTimes />
      </button>
    </Box>
  );
};
export default memo(Chip) as typeof Chip;
