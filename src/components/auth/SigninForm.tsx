"use client";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { MouseEventHandler, useContext, useState } from "react";
import Auth from ".";
import Link from "next/link";
import Form from "../controls/Form";
import Input from "../controls/Input";
import Button from "../controls/Button";
import FormGroup from "../controls/FormGroup";
import Alert from "../controls/Alert";
import { FaKey } from "react-icons/fa";
import { AppContext } from "../providers/AppProvider";
import { AppDispatch, IAppState } from "../store";
import { alertAction } from "../store/slices/alert";

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

  const [state, dispatch] = useContext<[IAppState, AppDispatch]>(AppContext);
  const { alertState } = state;

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
          redirect: false,
          callbackUrl: "/",
          ...values,
        });

        if (result?.error) {
          //setError(result.error);
          alertAction.alertShow(dispatch, { message: result.error });
        }

        setLoading(false);
      },
    });

  let message = loading && <p>{AppContent.signInWait}</p>;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* {error && <p>{error}</p>} */}
        <Alert alert={alertState} />
        {message}
        <Auth.Header title="Sign in">
          If you dont hae an account, please click on{" "}
          <Link className="text-secondary" href="/signup">
            Sign up
          </Link>
        </Auth.Header>
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
        <FormGroup>
          <Link href="/reset-password">
            <FaKey className="me-2" /> Forgot Password
          </Link>
        </FormGroup>
        <Button>{AppContent.signIn}</Button>
      </Form>

      {/* <AuthProvider /> */}
    </>
  );
};

export default SigninForm;
