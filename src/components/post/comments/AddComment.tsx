import Avatar from "@/components/controls/Avatar";
import Box from "@/components/controls/Box";

import Button from "@/components/controls/Button";
import CodeEditor from "@/components/controls/CodeEditor";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
} from "@/components/controls/EmojiPicker";
import Form from "@/components/controls/Form";
import IconButton from "@/components/controls/IconButton";
import Input from "@/components/controls/Input";
import Modal, { modalRef } from "@/components/controls/Modal";
import Stack from "@/components/controls/Stack";
import Textarea, { textareaRef } from "@/components/controls/Textarea";
import Upload from "@/components/controls/Uploader/Upload";
import { AppContext } from "@/components/providers/AppProvider";
import { alertAction } from "@/components/store/reducers/alert";
import { commentService } from "@/services/comment.service";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { FaCheck, FaCode, FaSmile } from "react-icons/fa";

/**
 * Add comment
 * @returns
 */
type AddCommentProps = {
  postId: string;
};
const AddComment = ({ postId }: AddCommentProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const modalRef = useRef<modalRef>(null);
  const emojiModalRef = useRef<modalRef>(null);
  const textareaRef = useRef<textareaRef>(null);

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: commentService.getIntialObject(),
    async onSubmit(values, { resetForm }) {
      console.log("v", values);
      if (values.message === "") return;
      setLoading(true);

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/post/" + postId + "/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (data.errors) {
        // alertAction.alertShow(dispatch, {
        //   message: data.errors.message,
        //   color: "danger",
        // });
      }

      router.refresh();
      resetForm();
      setLoading(false);
    },
  });

  const onSetEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    const { selectionEnd, selectionStart, selectionDirection } =
      textareaRef.current!;
    let textBeforeCursorPosition = values.message.substring(0, selectionStart);
    let textAfterCursorPosition = values.message.substring(
      selectionStart,
      values.message.length
    );
    let content =
      textBeforeCursorPosition +
      "" +
      emojiData.emoji +
      "" +
      textAfterCursorPosition;
    setFieldValue("message", content);
  };
  return (
    <>
      <Form className="comment-form mt-2" onSubmit={handleSubmit}>
        <Avatar
          src={session?.user.image!}
          size={30}
          alt={session?.user.name!}
        />

        <Stack className="comment-stack">
          <Textarea
            ref={textareaRef}
            name="message"
            rows={1}
            value={values.message}
            onBlur={handleBlur}
            placeholder=""
            onChange={handleChange}
          />

          <Upload title="Add image" name="image" setValues={setFieldValue} />
          <IconButton
            onClick={() => modalRef.current?.openHandler()}
            title="Add code"
            icon={<FaCode />}
          />
          <IconButton
            onClick={() => emojiModalRef.current?.openHandler()}
            title="Add emoji"
            icon={<FaSmile />}
          />
        </Stack>

        <IconButton title="Save comment" color="primary" type="submit">
          <FaCheck />
        </IconButton>
      </Form>
      <Modal ref={modalRef} label="Code editor">
        <CodeEditor name="code" setFieldValue={setFieldValue} />
      </Modal>
      <Modal
          label="Add emoji"
        onClose={() => {
          textareaRef.current?.focus();
        }}
        ref={emojiModalRef}
      >
        <EmojiPicker setValue={onSetEmoji} />
        {/* <EmojiPicker
          autoFocusSearch={true}
          onEmojiClick={onSetEmoji}
          width="100%"
          emojiStyle={EmojiStyle.FACEBOOK}
        /> */}
      </Modal>
    </>
  );
};

export default AddComment;
