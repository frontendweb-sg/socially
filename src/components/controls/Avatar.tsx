import Box from "./Box";
import classNames from "classnames";
import React, { FC } from "react";
import Image, { ImageProps } from "next/image";
import { Align, Color, Size } from "@/utils/types";

/**
 * Avatar
 * @returns
 */

type IAvatarProps = ImageProps & {
  align?: Align;
  size?: number;
  rounded?: number;
};

const Avatar: FC<IAvatarProps> = ({
  src = "/avatar.png",
  alt = "Avatar",
  align,
  color,
  children,
  style,
  size = 35,
  rounded = 5,
  ...rest
}) => {
  const classes = classNames("avatar", {
    ["text-" + align]: align,
  });

  const styles = {
    width: size + "px",
    height: size + "px",
    borderRadius: rounded + "px",
    ...style,
  };

  let imageEl = (
    <Image
      priority={false}
      src={"/avatar.png"}
      alt={alt! || "avatar"}
      sizes="100vw"
      fill
      {...rest}
    />
  );

  return (
    <Box className={classes} style={{ ...styles }}>
      {children ? children : imageEl}
    </Box>
  );
};

export default Avatar;
