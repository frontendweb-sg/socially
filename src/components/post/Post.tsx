"use client";
import PostTitle from "./PostTitle";
import Dropdown from "../controls/Dropdown";
import PostImage from "./PostImage";
import NavItem from "../layout/NavItem";
import Box from "../controls/Box";
import Button from "../controls/Button";
import { useContext } from "react";
import { IPostDoc } from "@/models/post";
import { AppContent } from "@/utils/content";
import { AppContext } from "../providers/AppProvider";
import { FaEyeSlash, FaPen, FaTrash } from "react-icons/fa";
import { deletePost } from "@/lib/post";

export type PostProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  post?: IPostDoc;
};

const Post = ({ post }: PostProps) => {
  const { onConfirm, state, editHandler, onCancelConfirm } =
    useContext(AppContext);

  const onDeletePost = () => {
    onConfirm({
      open: true,
      async onSubmit() {
        const response = await deletePost(post?.id);
        if (response.errors) {
        } else {
          onCancelConfirm();
        }
      },
    });
  };

  return (
    <Box className="card p-4 mb-3">
      <PostTitle name="Pradeep Kumar" image="/avatar.png">
        <Dropdown>
          <NavItem scroll={false} href="#" onClick={() => {}}>
            <FaPen /> Edit
          </NavItem>
          <NavItem href="#" onClick={() => {}}>
            <FaEyeSlash /> Inactive
          </NavItem>
          <NavItem scroll={false} href="#" onClick={onDeletePost}>
            <FaTrash /> Delete
          </NavItem>
        </Dropdown>
      </PostTitle>
      <PostImage fill src={post?.image!} alt={post?.title!} />
      <Box className="card-body">
        <h6>{post?.title}</h6>
        <p>{post?.description}</p>
        <Button onClick={() => editHandler(post)}>{AppContent.edit}</Button>
      </Box>
    </Box>
  );
};

export default Post;
