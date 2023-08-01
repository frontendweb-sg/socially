import { Media } from "@/models/post";
import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import Box from "../controls/Box";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  images: Media[];
  imgProps?: ImageProps;
};
const PostImage = ({ className, images, imgProps, ...rest }: Props) => {
  const classes = classNames("post-media", className);

  return (
    <Box className={classes} {...rest}>
      {images.map((image: Media) => (
        <Box
          style={{ width: `${100 / images.length}%` }}
          key={image.public_id}
          className={classNames("post-media-item")}
        >
          <figure>
            <Image
              fill
              sizes="100vw"
              style={{
                objectFit: "cover", // cover, contain, none
              }}
              {...imgProps}
              priority={false}
              src={image.secure_url}
              alt={image.secure_url}
            />
          </figure>
        </Box>
      ))}
    </Box>
  );
};

export default PostImage;
