"use client";
import Panel from "../controls/Panel";
import FormGroup from "../controls/FormGroup";
import Textarea from "../controls/Textarea";
import TagCreator from "../controls/TagCreator";
import Box from "../controls/Box";
import Button from "../controls/Button";
import Form from "../controls/Form";
import CodeEditor from "../controls/CodeEditor";
import Select from "../controls/Select";
import Upload from "../controls/Uploader/Upload";
import MediaDisplay from "../controls/Uploader/MediaDisplay";
import Stack from "../controls/Stack";
import IconButton from "../controls/IconButton";
import Modal, { modalRef } from "../controls/Modal";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AppContent, PostPrivacy } from "@/utils/content";
import { postService } from "@/services/post.service";
import { useAppState } from "../providers/AppProvider";
import { FaCode } from "react-icons/fa";
import { Cloudinary } from "@cloudinary/url-gen";
import { Media } from "@/models/post";
import { toast } from "react-toastify";

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

  const { state, resetEditing } = useAppState();
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
      values.tags = values.tags.map((tag: any) => tag.label);

      const formdata = new FormData();
      values.images.forEach((file: File) => {
        formdata.append(file.name, file);
      });
      const mediaResponse = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/upload",
        {
          method: "POST",
          body: formdata,
        }
      );

      const medias: Media[] = await mediaResponse.json();
      if (!medias) return;

      values.images = medias.map(
        ({
          public_id,
          secure_url,
          access_mode,
          folder,
          resource_type,
          type,
          version_id,
        }: Media) => ({
          public_id,
          secure_url,
          access_mode,
          folder,
          resource_type,
          type,
          version_id,
        })
      );

      setLoading(true);

      let response = null;
      if (values.id) {
        response = await postService.update(values as any);
      } else {
        response = await postService.add(values);
      }

      if (response.statusText === "OK") {
        resetForm();
        toast.success("Post added success!");
        router.refresh();
      }

      setLoading(false);
    },
  });

  const cancelHandler = () => {
    resetEditing();
  };

  const onCodeEditorChange = (value: any) => {
    setFieldValue("code", value);
  };
  function handleEditorChange(value: any, event: any) {
    console.log("here is the current model value:", event);
    setFieldValue("code", value);
  }

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
            placeholder="What's on your mind?"
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
          {values.images.length > 0 && (
            <MediaDisplay
              name="media"
              data={values.images}
              setValues={setFieldValue}
            />
          )}
          <Stack>
            <Upload
              accept=""
              multiple
              name="images"
              setValues={setFieldValue}
            />
            <IconButton
              className="ms-2"
              icon={<FaCode />}
              onClick={() => codeModalRef.current?.openHandler()}
            />
          </Stack>
        </FormGroup>

        <hr />
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
        <CodeEditor
          setFieldValue={setFieldValue}
          value={values.code}
          name="code"
        />
      </Modal>
    </Panel>
  );
};

export default AddPost;
