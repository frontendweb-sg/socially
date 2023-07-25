"use client";
import { useFormik } from "formik";
import Form from "../controls/Form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { postService } from "@/services/post.service";
import Panel from "../controls/Panel";
import { AppContent, PostPrivacy } from "@/utils/content";
import FormGroup from "../controls/FormGroup";
import Textarea from "../controls/Textarea";
import TagCreator from "../controls/TagCreator";
import Box from "../controls/Box";
import Button from "../controls/Button";
import { useAppState } from "../providers/AppProvider";
import { FaCode } from "react-icons/fa";
import Modal, { modalRef } from "../controls/Modal";
import CodeEditor from "../controls/CodeEditor";
import Select from "../controls/Select";
import FileUpload from "../controls/FileUpload";

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

  const codeModalRef = useRef<modalRef>(null);

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

        <FormGroup>
          <FileUpload multiple />
          <Button as="icon" onClick={() => codeModalRef.current?.openHandler()}>
            <FaCode />
          </Button>
        </FormGroup>

        <Box className="post-footer d-flex align-items-center justify-content-between">
          <Select
            name="privacy"
            defaultValue={values.privacy}
            setValues={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-25"
            options={PostPrivacy}
          />
          <Box className="d-flex ms-3">
            <Button className="me-3" color="secondary" onClick={cancelHandler}>
              {AppContent.cancel}
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "loading..." : values.id ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Form>

      <Modal ref={codeModalRef} label="Add code">
        <CodeEditor />
      </Modal>
    </Panel>
  );
};

export default AddPost;
