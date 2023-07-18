"use client";
import { useFormik } from "formik";
import Form from "../controls/Form";
import FormGroup from "../controls/FormGroup";
import Input from "../controls/Input";
import Textarea from "../controls/Textarea";
import Button from "../controls/Button";
import Panel from "../controls/Panel";
import {
  ProviderProps,
  ServerContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AppContent } from "@/utils/content";
import { AppContext, useAppState } from "../providers/AppProvider";

type AddPostProps = {
  cookie: any;
};
const AddPost = ({ cookie }: AddPostProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { state, dispatch, resetEditing, editHandler } = useAppState();
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
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button disabled={loading} type="submit">
          {loading ? "loading..." : values.id ? "Update" : "Add"}
        </Button>
      </Form>
    </Panel>
  );
};

export default AddPost;
