import React, { useEffect, useState } from "react";
import Box from "../Box";
import classNames from "classnames";
import Image from "next/image";
import { toBase64 } from "@/utils";
import Skeleton from "../Skeleton";
import Row from "../Row";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  media: File[];
  name: string;
  setValues: (name: string, files: File[]) => void;
};
const MediaDisplay = ({
  name,
  media,
  setValues,
  className,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const classes = classNames("media", className);

  const onRemove = (index: number) => {
    const existingMedia = [...media!];
    existingMedia.splice(index, 1);
    setValues(name!, existingMedia);
  };

  useEffect(() => {
    const load = async () => {
      const imgs = await Promise.all(
        media?.map(async (item) => await toBase64(item))
      );
      setLoading(false);
      setImages(imgs);
    };
    load();
  }, [media]);

  return (
    <Box className={classes} {...rest}>
      <Box className="media-row">
        {images.map((media: string, index: number) => {
          return (
            <Box
              style={{ width: `${100 / images.length}%` }}
              className="media-item"
              key={media + "-" + index}
            >
              <Box className="media-item-child">
                <Button
                  variant="text"
                  onClick={() => onRemove?.(index)}
                  as="icon"
                >
                  <FaTimes />
                </Button>
                {loading ? (
                  <Skeleton size={25} as="avatar" animate />
                ) : media.startsWith("data:video") ? (
                  <div>
                    {/* <video poster={media} controls width="100%">
                <source src={media} type={type}></source>
              </video> */}
                  </div>
                ) : (
                  <Image priority={false} fill src={media!} alt="media" />
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
