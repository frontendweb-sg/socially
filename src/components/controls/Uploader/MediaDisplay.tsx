import React from "react";
import Box from "../Box";
import classNames from "classnames";
import Image from "next/image";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  data: File[];
  name: string;
  setValues: (name: string, files: File[]) => void;
};
const MediaDisplay = ({ name, data, setValues, className, ...rest }: Props) => {
  const classes = classNames("media", className);

  const onRemove = (index: number) => {
    const existingMedia = [...data!];
    existingMedia.splice(index, 1);
    setValues(name!, existingMedia);
  };

  return (
    <Box className={classes} {...rest}>
      <Box className="media-row">
        {data.map((file: IFile, index: number) => {
          return (
            <Box
              style={{ width: `${100 / data.length}%` }}
              className="media-item"
              key={file + "-" + index}
            >
              <Box className="media-item-child">
                <Button
                  variant="text"
                  onClick={() => onRemove?.(index)}
                  as="icon"
                >
                  <FaTimes />
                </Button>
                {file.type === "video/mp4" ? (
                  <video poster={file.preview!} controls width="100%">
                    <source src={file.preview!} type={file.type}></source>
                  </video>
                ) : (
                  <Image
                    priority={false}
                    fill
                    src={file.preview!}
                    alt="media"
                    sizes="100vw"
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview!);
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MediaDisplay;
