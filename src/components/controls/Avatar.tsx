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
  bg?: Color;
  src?: string;
  alt?: string;
  width?: number;
  size?: Size;
  align?: Align;
  color?: Color;
  style?: React.CSSProperties;
  circle?: boolean;
  border?: number;
  rounded?: number;
};

const Avatar: FC<IAvatarProps> = ({
  src = "/avatar.png",
  alt = "Avatar",
  width = 25,
  align,
  circle,
  color,
  border,
  children,
  style,
  bg,
  size,
  rounded = 5,
  ...rest
}) => {
  const classes = classNames("avatar", {
    ["text-" + align]: align,
    ["border border-" + color]: color,
    ["border-" + border]: border,
    ["bg-" + bg]: bg,
    ["avatar-" + size]: size,
    circle: circle,
  });

  const styles = {
    width: width + "px",
    height: width + "px",
    borderRadius: rounded + "px",
    ...style,
  };

  let imageEl = (
    <Image
      src={"/avatar.png"}
      alt={alt! || "avatar"}
      width={width}
      height={width}
      {...rest}
    />
  );
  if (src) {
    imageEl = (
      <Image
        src={src}
        alt={alt! || "avatar"}
        width={width}
        height={width}
        {...rest}
      />
    );
  }

  return (
    <Box className={classes} style={{ ...styles }}>
      {children ? children : imageEl}
    </Box>
  );
};

export default Avatar;
