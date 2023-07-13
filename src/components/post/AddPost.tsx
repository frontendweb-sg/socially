"use client";
import { useFormik } from "formik";
import Form from "../controls/Form";
import FormGroup from "../controls/FormGroup";
import Input from "../controls/Input";
import Textarea from "../controls/Textarea";
import Button from "../controls/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AddPostProps = {
  cookie: any;
};
const AddPost = ({ cookie }: AddPostProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
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
      async onSubmit(values, formikHelpers) {
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

        if (response.status === 201) {
          router.refresh();
        }
        setLoading(true);
      },
    });

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {loading && <p>Please wait post saving...</p>}
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
      <Button disabled={loading} type="submit">
        {loading ? "Adding..." : values.id ? "Update" : "Add"}
      </Button>
    </Form>
  );
};

export default AddPost;
