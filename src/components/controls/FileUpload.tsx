import Box from "./Box";
import Button from "./Button";
import classNames from "classnames";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { useRef, forwardRef, useState, ChangeEvent, useCallback } from "react";
import { File } from "buffer";
import { toBase64 } from "@/utils";

type IconType = "image" | "camera" | "video";
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  as?: "icon" | "dropzone";
  icon?: IconType;
  setValues?: (file: File[]) => void;
  setErrors?: (message: string) => void;
  size?: number;
};

type fileRef = HTMLInputElement;
const FileUpload = forwardRef<fileRef, Props>(
  (
    {
      as = "icon",
      icon = "image",
      className,
      multiple = false,
      setValues,
      setErrors,
      onChange,
      size = 5,
      ...rest
    },
    ref
  ) => {
    const [error, setError] = useState<string | null>(null);
    const [media, setMedia] = useState<string[]>([]);

    const fileref = useRef<HTMLInputElement>(null);

    const classes = classNames(
      "upload",
      as === "icon" ? "upload-icon" : "upload-card",
      className
    );

    const onChangeHandler = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        setError("");

        if (!ev.target.files) {
          return;
        }

        const files = Array.from(ev.target.files);
        if (multiple && (media.length || files.length) >= size) {
          console.log("Hi");
          setError("You can not upload more than " + size + " files");
          return;
        }

        onChange?.(ev);

        files.forEach(async (file) => {
          const img: string = await toBase64(file);
          setMedia((prev) => [...prev, img]);
        });
      },
      [media, size, onChange, multiple]
    );

    const onClick = () => {
      if (fileref.current) fileref.current.click();
    };

    const onClear = (e: React.MouseEvent<HTMLInputElement>) => {
      e.currentTarget.value = "";
    };

    if (as === "icon") {
      return (
        <Box className={classes}>
          {error}
          <Box className="preview">
            {media.map((file: string) => (
              <Box className="preview-item" key={file}>
                <Image fill src={file} alt={file} />
              </Box>
            ))}
          </Box>
          <input
            type="file"
            ref={fileref}
            multiple={multiple}
            onChange={onChangeHandler}
            {...rest}
          />
          <Button as="icon" onClick={onClick}>
            <FaUpload />
          </Button>
        </Box>
      );
    }

    return (
      <Box className={classes}>
        <input type="file" ref={fileref} />
        <Button as="icon" onClick={onClick}>
          <FaUpload />
        </Button>
      </Box>
    );
  }
);

export default FileUpload;
