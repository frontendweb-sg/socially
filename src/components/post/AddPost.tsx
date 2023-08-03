"use client";
import Panel from "../controls/Panel";
import FormGroup from "../controls/FormGroup";
import Textarea from "../controls/Textarea";
import Box from "../controls/Box";
import Button from "../controls/Button";
import Form from "../controls/Form";
import CodeEditor from "../controls/CodeEditor";
import Upload from "../controls/Uploader/Upload";
import MediaDisplay from "../controls/Uploader/MediaDisplay";
import Stack from "../controls/Stack";
import LoggedInUserAvatar from "../user/LoggedInUserAvatar";
import Typography from "../controls/Typography";
import Dropdown from "../controls/Dropdown";
import NavItem from "../layout/NavItem";
import { modalRef } from "../controls/Modal";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AppContent, PostPrivacy } from "@/utils/content";
import { postService } from "@/services/post.service";
import {
  FaCaretDown,
  FaEdit,
  FaImage,
  FaSmile,
  FaTag,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Media } from "@/models/post";
import { toast } from "react-toastify";
import * as yup from "yup";
import Select from "../controls/Select";
import CustomSelect from "../controls/CustomSelect";
import IconButton from "../controls/IconButton";
import Input from "../controls/Input";

const validation = yup.object().shape({
  content: yup.string(),
  //tags: yup.array().min(1).required("Tags required"),
});
/**
 * Add post
 * @returns
 */

type Props = {
  cookie: any;
};
const AddPost = ({ cookie }: Props) => {
  const [enableTag, setEnableTag] = useState(false);
  const [enableStatus, setEnableStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const codeModalRef = useRef<modalRef>(null);
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: postService.getIntialData(),
    validationSchema: validation,
    async onSubmit(values, { resetForm, setSubmitting }) {
      setLoading(true);
      const tags = values.tags?.map((tag: any) => tag.label) as string[];
      values.tags = tags as string[];
      values.code = JSON.parse(values?.code as unknown as string);

      console.log("v", values);
      setLoading(false);
      setSubmitting(false);
      return;
      if (values.images.length > 0) {
        const formdata = new FormData();
        values.images.forEach((file: any) => {
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
        if (medias.length > 0) {
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
        }
      }
      let response = await postService.add(values);
      if (response.status === 201) {
        resetForm();
        toast.success("Post added successfully!");
        router.refresh();
      }
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <Panel className="card-create-post mb-3">
      {loading && <p>Please wait post saving</p>}
      <Panel.Title>
        <Box className="post-loggedin-user">
          <LoggedInUserAvatar />
          <Typography className="ms-2" variant="h5">
            {AppContent.addPost}
          </Typography>
        </Box>
        <Dropdown>
          <NavItem
            custom
            className="dropdown-item"
            scroll={false}
            href="/user/profile"
          >
            <FaEdit className="me-2" /> {AppContent.editProfile}
          </NavItem>
          <NavItem
            custom
            className="dropdown-item"
            scroll={false}
            href="/user/profile"
          >
            <FaUser className="me-2" /> {AppContent.viewProfile}
          </NavItem>
        </Dropdown>
      </Panel.Title>
      <Panel.Body>
        <Form onSubmit={handleSubmit}>
          <CodeEditor
            name="code"
            setFieldValue={setFieldValue}
            value={values.code.language_code}
            onClose={codeModalRef.current?.closeHandler}
            height="300px"
          />
          {enableStatus && (
            <FormGroup className="mt-3">
              <Input
                name="content"
                value={values.content}
                placeholder="What's on your mind?"
                errors={errors}
                touched={touched}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FormGroup>
          )}
          {enableTag && (
            <FormGroup>
              <CustomSelect
                startIcon={<FaTag className="me-2" />}
                options={[
                  { id: 1, label: "Html" },
                  { id: 2, label: "Css" },
                  { id: 3, label: "Js" },
                  { id: 4, label: "React" },
                  { id: 5, label: "Vue" },
                  { id: 6, label: "Angular" },
                ]}
                defaultValue={values.tags as any}
                setValues={(options) => setFieldValue("tags", options)}
                isClear
                isMulti
              >
                <IconButton icon={<FaTimes />} />
              </CustomSelect>
              {errors["tags"] && touched["tags"] && (
                <p className="text-danger mt-2">Tags are required!</p>
              )}
            </FormGroup>
          )}

          <FormGroup>
            {values.images.length > 0 && (
              <MediaDisplay
                name="images"
                data={values.images as unknown as File[]}
                setValues={setFieldValue}
              />
            )}
            <Stack>
              <Upload
                icon={<FaImage className="me-1" />}
                accept=""
                multiple
                name="images"
                setValues={setFieldValue}
                button
                className="me-2"
                btnProps={{
                  color: "light",
                  variant: "outline",
                }}
              >
                {AppContent.images}
              </Upload>
              <Button
                startIcon={<FaSmile className="me-1" />}
                variant="outline"
                className="me-2"
                color="light"
                onClick={() => setEnableStatus((prev) => !prev)}
              >
                {AppContent.feelingActivity}
              </Button>
              <Button
                color="light"
                startIcon={<FaTag className="me-1" />}
                variant="outline"
                onClick={() => setEnableTag((prev) => !prev)}
              >
                {AppContent.tagFriends}
              </Button>
            </Stack>
          </FormGroup>
          <hr />
          <Box className="post-footer d-flex align-items-center justify-content-between">
            <Select
              options={PostPrivacy}
              onChange={handleChange}
              className="w-25"
              name="privacy"
              value={values.privacy}
            />
            <Box className="d-flex ms-3">
              <Button
                className="me-3"
                color="secondary"
                onClick={() =>
                  resetForm({ values: postService.getIntialData() })
                }
              >
                {AppContent.cancel}
              </Button>
              <Button
                loading={loading || isSubmitting}
                disabled={loading || isSubmitting}
                type="submit"
              >
                {AppContent.save}
              </Button>
            </Box>
          </Box>
        </Form>
      </Panel.Body>
    </Panel>
  );
};

export default AddPost;
