"use client";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { MouseEventHandler, useState } from "react";
import Auth from ".";
import Link from "next/link";
import Form from "../controls/Form";
import Input from "../controls/Input";
import Button from "../controls/Button";
import FormGroup from "../controls/FormGroup";
/**
 * Sign-in component
 * @returns
 */
interface SigninProps {
  onChange?: MouseEventHandler<HTMLAnchorElement>;
}
const SigninForm = ({ onChange }: SigninProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "pkumar2@pythian.com",
        password: "Admin123@",
      },
      async onSubmit(values, {}) {
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
          redirect: true,
          callbackUrl: "/",
          ...values,
        });

        if (result?.error) {
          setError(result.error);
        }

        setLoading(false);
      },
    });

  let message = loading && <p>{AppContent.signInWait}</p>;
  return (
    <>
      <Auth.Header title="Sign in">
        If you dont hae an account, please click on{" "}
        <Link className="text-secondary" href="#" onClick={onChange!}>
          Sign up
        </Link>
      </Auth.Header>
      <Form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {message}
        <FormGroup>
          <Input
            name="email"
            type="email"
            placeholder="Email id"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="***********"
            name="password"
            type="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <Button>{AppContent.signIn}</Button>
      </Form>
    </>
  );
};

export default SigninForm;
