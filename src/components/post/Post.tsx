"use client";
import PostTitle from "./PostTitle";
import Dropdown from "../controls/Dropdown";
import PostImage from "./PostImage";
import NavItem from "../layout/NavItem";
import Box from "../controls/Box";
import Button from "../controls/Button";
import AddComment from "./comments/AddComment";
import Comments from "./comments/Comments";
import { useContext } from "react";
import { ICommentDoc, IPostDoc, Media } from "@/models/post";
import { AppContent } from "@/utils/content";
import { AppContext } from "../providers/AppProvider";
import { FaEyeSlash, FaPen, FaTrash } from "react-icons/fa";
import { deletePost } from "@/lib/post";
import Link from "next/link";
import Tabs from "../controls/Tabs";
import TabContent from "../controls/Tabs/TabContent";
import CodeEditor from "../controls/CodeEditor";

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
      <PostTitle
        insertAt={post?.createdAt!}
        name="Pradeep Kumar"
        image="/avatar.png"
      >
        <Dropdown buttonProps={{ variant: "text" }}>
          <NavItem
            custom
            className="dropdown-item"
            scroll={false}
            href="#"
            onClick={() => {}}
          >
            <FaPen className="me-2" /> {AppContent.edit}
          </NavItem>
          <NavItem
            custom
            className="dropdown-item"
            scroll={false}
            href="#"
            onClick={() => {}}
          >
            <FaEyeSlash className="me-2" /> Inactive
          </NavItem>
          <NavItem
            custom
            className="dropdown-item"
            scroll={false}
            href="#"
            onClick={onDeletePost}
          >
            <FaTrash className="me-2" /> {AppContent.delete}
          </NavItem>
        </Dropdown>
      </PostTitle>

      <Tabs tabs={["Photos", "Code"]}>
        <TabContent index={0}>
          <PostImage images={post?.images!} />
        </TabContent>
        <TabContent index={1}>
          <CodeEditor readonly={true} value={post?.code} />
        </TabContent>
      </Tabs>
      <Box className="post-body">
        <p>
          {post?.content.substring(0, 200)}...
          <Link className="link" href="#" scroll={false}>
            Read more
          </Link>
        </p>
      </Box>
      <Comments comments={post?.comments as ICommentDoc[]} />
      <AddComment postId={post?.id} />
    </Box>
  );
};

export default Post;
