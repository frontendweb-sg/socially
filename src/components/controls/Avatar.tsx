import Image, { ImageProps } from "next/image";
import Box from "./Box";
import classNames from "classnames";
import AvatarImg from "../public/avatar.png";
import React, { FC } from "react";
import { Align, Color } from "@/utils/types";

/**
 * Avatar
 * @returns
 */

type IAvatarProps = ImageProps & {
  bg?: Color;
  src?: string;
  alt?: string;
  size?: number;
  align?: Align;
  color?: Color;
  style?: React.CSSProperties;
  circle?: boolean;
  border?: number;
};

const Avatar: FC<IAvatarProps> = ({
  src,
  alt,
  size,
  align,
  circle,
  color,
  border,
  children,
  style,
  bg,
  ...rest
}) => {
  const imgSrc = src || AvatarImg;
  const classes = classNames("avatar", {
    ["text-" + align]: align,
    ["border border-" + color]: color,
    ["border-" + border]: border,
    ["bg-" + bg]: bg,
    circle: circle,
  });
  const sizeBorder = size! + border!;
  const styles = {
    width: sizeBorder + "px",
    height: sizeBorder + "px",
    ...style,
  };
  return (
    <Box className={classes} style={{ ...styles }}>
      {children ? (
        children
      ) : (
        <Image
          src={imgSrc}
          alt={alt! || "avatar"}
          width={size}
          height={size}
          {...rest}
        />
      )}
    </Box>
  );
};

Avatar.defaultProps = {
  size: 35,
  border: 0,
};
export default Avatar;
