"use client";
import { signup } from "@/lib/auth";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";

import Link from "next/link";
import Form from "../controls/Form";
import Button from "../controls/Button";
import Input from "../controls/Input";
import FormGroup from "../controls/FormGroup";
import Row from "../controls/Row";
import Col from "../controls/Col";
import Box from "../controls/Box";
/**
 * Sign-in component
 * @returns
 */
interface SigninProps {
  onChange?: MouseEventHandler<HTMLAnchorElement>;
}
const SignupForm = ({ onChange }: SigninProps) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        mobile: "",
      },
      async onSubmit(values, {}) {
        setLoading(true);
        setError("");

        try {
          const result = await signup(values);
          if (result.status === 201) {
            setTimeout(() => {
              router.replace("/signin");
            }, 3000);
          }
        } catch (error) {
          if (error instanceof Error) setError(error.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {loading && <p>{AppContent.signUpWait}</p>}
        <Box title="Sign up">
          If you have an account, please click on{" "}
          <Link className="text-secondary" href="/signin">
            Sign in
          </Link>
        </Box>
        <Row>
          <Col>
            <FormGroup>
              <Input
                name="name"
                type="text"
                placeholder="Enter full name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
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
          </Col>
        </Row>
        <FormGroup>
          <Input
            name="password"
            type="password"
            placeholder="***********"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="mobile"
            type="text"
            placeholder="Mobile no"
            value={values.mobile}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? AppContent.loading : AppContent.signUp}
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
