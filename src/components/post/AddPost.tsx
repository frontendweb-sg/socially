"use client";
import Form from "../controls/Form";
import FormGroup from "../controls/FormGroup";
import Input from "../controls/Input";
import Textarea from "../controls/Textarea";
import Button from "../controls/Button";
import Panel from "../controls/Panel";
import Box from "../controls/Box";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContent } from "@/utils/content";
import { useAppState } from "../providers/AppProvider";
import TagCreator from "../controls/TagCreator";

type AddPostProps = {
  cookie: any;
};

type Option = {
  id: string;
  label: string;
  title: string;
};

const AddPost = ({ cookie }: AddPostProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { state, resetEditing } = useAppState();
  const { editData } = state;

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      id: "",
      title: "",
      slug: "",
      description: "",
      image: "",
      active: true,
      isFeature: false,
      isRecent: false,
      comments: [],
    },
    async onSubmit(values, { resetForm }) {
      setLoading(true);
      setError("");

      const url = values.id ? "/post/" + values.id : "/post";

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: values.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${cookie}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data?.errors) {
        setError(data.errors.message);
      }

      if (response.statusText === "OK") {
        resetForm();
        router.refresh();
      }

      setLoading(false);
    },
  });

  const cancelHandler = () => {
    resetEditing();
  };

  useEffect(() => {
    if (editData) {
      setValues((prev) => ({ ...prev, ...editData }));
    }
  }, [editData, setValues]);

  return (
    <Panel className="card-post mb-3">
      <Panel.Title>{AppContent.addPost}</Panel.Title>
      <Form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {loading && (
          <p>Please wait post {values.id ? "updating..." : "saving..."}</p>
        )}
        <FormGroup>
          <Input
            name="title"
            value={values.title}
            placeholder="Title"
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />{" "}
        </FormGroup>
        <FormGroup>
          <Textarea
            name="description"
            value={values.description}
            placeholder="Description"
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="image"
            value={values.image}
            placeholder="Image url"
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <TagCreator
            options={[
              { id: "1", a: "Jhon", title: "Doe" },
              { id: "2", a: "Jona", title: "Doe" },
              { id: "3", a: "Jhonney", title: "Doe" },
            ]}
            values={[{ id: "1", a: "Jhon", title: "Doe" }]}
            getOptionLabel={(option) => option.title}
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
