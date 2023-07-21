"use client";
import { useFormik } from "formik";
import Form from "../../../components/controls/Form";
import Input from "../../../components/controls/Input";
import Button from "../../../components/controls/Button";
import Link from "next/link";
import FormGroup from "../../../components/controls/FormGroup";
import Box from "../../../components/controls/Box";

const ResetPassword = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      async onSubmit(values, formikHelpers) {
        console.log("values", values);
      },
    });
  return (
    <Form onSubmit={handleSubmit}>
      <Box title="Reset password">
        Back to signin, please click on{" "}
        <Link className="text-secondary" href="/signin">
          Sign in
        </Link>
      </Box>
      <FormGroup>
        <Input
          name="email"
          placeholder="Email"
          value={values.email}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
      <Button block type="submit">
        Reset
      </Button>
    </Form>
  );
};

export default ResetPassword;
