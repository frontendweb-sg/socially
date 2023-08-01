import {
  ChangeEvent,
  ReactElement,
  forwardRef,
  useRef,
  useState,
  memo,
  useImperativeHandle,
} from "react";
import Box from "../Box";
import Typography from "../Typography";
import classNames from "classnames";
import IconButton from "../IconButton";
import { FaImage } from "react-icons/fa";

type Accept = "video/*" | "image/*";
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactElement;
  size?: number;
  setValues: (name: string, files: File[]) => void;
  accept?: string | Accept;
};
export type uploadRef = {
  onClear: () => void;
};
const Upload = forwardRef<uploadRef, Props>(
  (
    {
      size = 5,
      icon = <FaImage />,
      multiple = false,
      setValues,
      className,
      title,
      accept = ".jpeg,.jpg,.png,.eps",
      ...rest
    },
    ref
  ) => {
    const [error, setError] = useState("");
    const inpRef = useRef<HTMLInputElement>(null);

    const classes = classNames("upload", className);

    const onChangeHandler = async (ev: ChangeEvent<HTMLInputElement>) => {
      if (!ev.target.files) return;

      const files = Array.from(ev.target.files) as File[];
      if (multiple && ev.target.files.length > size) {
        setError("You can not upload more than " + size + " files");
        setValues(ev.target.name, []);
        return;
      }

      files.forEach((file: File) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setValues(ev.target.name, files);
    };

    const onClick = () => {
      inpRef.current?.click();
    };

    const onClear = () => {
      if (inpRef.current) inpRef.current.value = "";
    };

    useImperativeHandle(ref, () => ({
      current: inpRef.current,
      onClear,
    }));

    return (
      <Box className={classes}>
        {error && (
          <Typography variant="span" color="danger">
            {error}
          </Typography>
        )}
        <input
          type="file"
          ref={inpRef}
          onChange={onChangeHandler}
          multiple={multiple}
          accept={accept}
          {...rest}
        />
        <IconButton title={title} onClick={onClick} icon={icon} />
      </Box>
    );
  }
);

export default memo(Upload) as typeof Upload;
