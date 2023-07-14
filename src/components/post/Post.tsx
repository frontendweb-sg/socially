"use client";
import { IPostDoc } from "@/models/post";
import Box from "../controls/Box";
import Button from "../controls/Button";
import { useContext } from "react";
import { AppContent } from "@/utils/content";
import { AppContext } from "../providers/AppProvider";
import PostTitle from "./PostTitle";
import Dropdown from "../controls/Dropdown";

export type PostProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  post?: IPostDoc;
};

const Post = ({ post }: PostProps) => {
  const { state, editHandler } = useContext(AppContext);
  console.log("state", state);
  return (
    <Box className="card p-2 mb-3">
      <PostTitle name="Pradeep Kumar" image="/avatar.png">
        <Dropdown />
      </PostTitle>
      <Box className="card-body">
        <h6>{post?.title}</h6>
        <p>{post?.description}</p>
        <Button onClick={() => editHandler(post)}>{AppContent.edit}</Button>
      </Box>
    </Box>
  );
};

export default Post;
