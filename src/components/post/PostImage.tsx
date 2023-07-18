import classNames from "classnames";
import Image, { ImageProps } from "next/image";

type PostImageProps = ImageProps &
  React.ImgHTMLAttributes<HTMLImageElement> & {};
const PostImage = ({ src, alt, className, ...rest }: PostImageProps) => {
  const classes = classNames("post-image", className);
  return (
    <figure className={classes}>
      <Image src={src} alt={alt} {...rest} />
      <figcaption></figcaption>
    </figure>
  );
};

export default PostImage;
