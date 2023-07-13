"use client";
import { IPostDoc } from "@/models/post";
import Box from "../controls/Box";
import Button from "../controls/Button";

export type PostProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  post?: IPostDoc;
  onEdit?: (value: IPostDoc) => void;
};

const Post = ({ post, onEdit }: PostProps) => {
  return (
    <Box className="card p-2 mb-3">
      <Box className="card-body">
        <h6>{post?.title}</h6>
        <p>{post?.description}</p>
        <Button onClick={() => onEdit?.(post!)}>Edit</Button>
      </Box>
    </Box>
  );
};

export default Post;
