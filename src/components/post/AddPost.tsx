"use client";
import { useFormik } from "formik";
import Form from "../controls/Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postService } from "@/services/post.service";
import Panel from "../controls/Panel";
import { AppContent } from "@/utils/content";
import FormGroup from "../controls/FormGroup";
import Textarea from "../controls/Textarea";
import TagCreator from "../controls/TagCreator";
import Box from "../controls/Box";
import Button from "../controls/Button";
import { useAppState } from "../providers/AppProvider";

/**
 * Add post
 * @returns
 */

type Props = {
  cookie: any;
};
const AddPost = ({ cookie }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { state, resetEditing, dispatch } = useAppState();
  const { editData } = state;

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: editData ?? postService.getIntialData(),
    async onSubmit(values, { resetForm, setSubmitting }) {
      console.log(values);

      // setLoading(true);

      // let response = null;
      // if (values.id) {
      //   response = await postService.update(values as any);
      // } else {
      //   response = await postService.add(values);
      // }

      // const data = response.data;

      // if (response.statusText === "OK") {
      //   resetForm();
      //   router.refresh();
      // }

      // setLoading(false);
    },
  });

  const cancelHandler = () => {
    resetEditing();
  };

  return (
    <Panel className="card-post mb-3">
      <Panel.Title>{AppContent.addPost}</Panel.Title>
      {loading && (
        <p>Please wait post {values.id ? "updating..." : "saving..."}</p>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Textarea
            name="content"
            value={values.content}
            placeholder="Status"
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <TagCreator
            options={[
              { id: "1", label: "Html" },
              { id: "2", label: "Css" },
              { id: "3", label: "Js" },
            ]}
            defaultValues={values.tags}
            getOptionLabel={(option) => option?.label}
            setValues={setFieldValue}
          />
        </FormGroup>

        <Box className="d-flex align-items-center justify-content-end">
          <Button className="me-3" color="secondary" onClick={cancelHandler}>
            {AppContent.cancel}
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? "loading..." : values.id ? "Update" : "Add"}
          </Button>
        </Box>
      </Form>
    </Panel>
  );
};

export default AddPost;
