import Avatar from "@/components/controls/Avatar";
import CodeEditor from "@/components/controls/CodeEditor";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
} from "@/components/controls/EmojiPicker";
import Form from "@/components/controls/Form";
import IconButton from "@/components/controls/IconButton";
import Modal, { modalRef } from "@/components/controls/Modal";
import Stack from "@/components/controls/Stack";
import Textarea, { textareaRef } from "@/components/controls/Textarea";
import Upload from "@/components/controls/Uploader/Upload";
import { commentService } from "@/services/comment.service";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaCheck, FaCode, FaSmile } from "react-icons/fa";
import { toast } from "react-toastify";

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

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: commentService.getIntialObject(),
      async onSubmit(values, { resetForm }) {
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
          toast.error(data.errors.message);
        }

        router.refresh();
        resetForm();
        setLoading(false);
      },
    });

  const onSetEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    const { selectionStart } = textareaRef.current!;
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

  // const onKeyHandler = (e: KeyboardEvent) => {
  //   const { code } = e;

  //   if (code === "Enter") {
  //     handleSubmit();
  //   }
  // };

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

          <Upload
            color="secondary"
            title="Add image"
            name="image"
            setValues={setFieldValue}
          />

          <IconButton
            onClick={() => modalRef.current?.openHandler()}
            title="Add code"
            color="secondary"
            icon={<FaCode />}
          />

          <IconButton
            onClick={() => emojiModalRef.current?.openHandler()}
            title="Add emoji"
            color="secondary"
            icon={<FaSmile />}
          />
        </Stack>

        <IconButton
          disabled={values.message.length == 0}
          title="Save comment"
          color="primary"
          type="submit"
          variant="filled"
        >
          <FaCheck />
        </IconButton>
      </Form>
      <Modal ref={modalRef} label="Code editor">
        <CodeEditor name="code" setFieldValue={setFieldValue} />
      </Modal>
      <Modal
        label="Add emoji"
        ref={emojiModalRef}
        onClose={() => {
          textareaRef.current?.focus();
        }}
      >
        <EmojiPicker
          width="100%"
          emojiStyle={EmojiStyle.FACEBOOK}
          onEmojiClick={onSetEmoji}
        />
      </Modal>
    </>
  );
};

export default AddComment;
