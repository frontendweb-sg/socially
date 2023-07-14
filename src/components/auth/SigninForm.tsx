"use client";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { MouseEventHandler, useContext, useState } from "react";
import Link from "next/link";
import Form from "../controls/Form";
import Input from "../controls/Input";
import Button from "../controls/Button";
import FormGroup from "../controls/FormGroup";
import Alert from "../controls/Alert";
import { FaKey } from "react-icons/fa";
import { AppContext } from "../providers/AppProvider";
import { AppDispatch, IAppState } from "../store";
import { alertAction } from "../store/reducers/alert";
import * as yup from "yup";
import Box from "../controls/Box";

const validation = yup.object().shape({
  email: yup.string().email("Invalid email id").required("Email is requried"),
  password: yup.string().required("Password is required!"),
});
/**
 * Sign-in component
 * @returns
 */
interface SigninProps {
  onChange?: MouseEventHandler<HTMLAnchorElement>;
}
const SigninForm = () => {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext<[IAppState, AppDispatch]>(AppContext);
  const { alertState } = state;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "pkumar2@pythian.com",
        password: "Admin123@",
      },
      validationSchema: validation,
      async onSubmit(values, {}) {
        setLoading(true);

        const result = await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          ...values,
        });

        if (result?.error) {
          alertAction.alertShow(dispatch, {
            message: result.error,
            color: "danger",
          });
        }

        setLoading(false);
      },
    });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Alert alert={alertState} />
        <Alert
          alert={{
            visible: loading,
            message: AppContent.signInWait,
            color: "info",
          }}
        />
        <Box title="Sign in">
          {AppContent.dontHaveAccount}
          <Link className="text-secondary" href="/signup">
            {AppContent.signUp}
          </Link>
        </Box>
        <FormGroup>
          <Input
            name="email"
            type="email"
            placeholder="Email id"
            errors={errors}
            touched={touched}
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
            errors={errors}
            touched={touched}
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Link href="/reset-password">
            <FaKey className="me-2" /> {AppContent.forgotPassword}
          </Link>
        </FormGroup>
        <Button>{AppContent.signIn}</Button>
      </Form>

      {/* <AuthProvider /> */}
    </>
  );
};

export default SigninForm;
