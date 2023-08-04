"use client";
import Button from "@/components/controls/Button";
import Form from "@/components/controls/Form";
import Input from "@/components/controls/Input";
import { sendMail } from "@/lib/user";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { notFound, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import * as yup from "yup";

/**
 * Resend verification page
 * @returns
 */
const ResendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [status, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const {
    isSubmitting,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email is not valid!")
        .required("Email is required!"),
    }),
    async onSubmit(values, { setSubmitting }) {
      setLoading(true);
      startTransition(async () => {
        const response = await sendMail(values);

        console.log(response);
      });
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        className="me-3"
        placeholder="Email id"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errors={errors}
        touched={touched}
      />
      <Button
        disabled={values.email.length == 0 || isSubmitting}
        loading={isSubmitting}
        type="submit"
      >
        {AppContent.send}
      </Button>
    </Form>
  );
};

export default ResendEmail;
