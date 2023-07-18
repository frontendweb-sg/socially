import Avatar from "@/components/controls/Avatar";
import Box from "@/components/controls/Box";
import Button from "@/components/controls/Button";
import Form from "@/components/controls/Form";
import Input from "@/components/controls/Input";
import Typography from "@/components/controls/Typography";
import { AppContext } from "@/components/providers/AppProvider";
import { alertAction } from "@/components/store/reducers/alert";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";

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

  const { dispatch } = useContext(AppContext);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        message: "",
      },
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
          alertAction.alertShow(dispatch, {
            message: data.errors.message,
            color: "danger",
          });
        }

        router.refresh();
        resetForm();
        setLoading(false);
      },
    });

  return (
    <Form className="comment-add" onSubmit={handleSubmit}>
      <Avatar
        src={session?.user.image!}
        size="sm"
        width={30}
        alt={session?.user.name!}
      />

      <Input
        name="message"
        value={values.message}
        errors={errors}
        touched={touched}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Button as="icon" type="submit">
        <FaCheck />
      </Button>
    </Form>
  );
};

export default AddComment;
