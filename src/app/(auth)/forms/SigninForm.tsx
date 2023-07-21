"use client";
import Link from "next/link";
import Form from "../../../components/controls/Form";
import Input from "../../../components/controls/Input";
import Button from "../../../components/controls/Button";
import FormGroup from "../../../components/controls/FormGroup";
import Alert from "../../../components/controls/Alert";
import Box from "../../../components/controls/Box";
import Typography from "../../../components/controls/Typography";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { MouseEventHandler, useContext, useState } from "react";
import { FaKey } from "react-icons/fa";
import {
  AppContext,
  useAppState,
} from "../../../components/providers/AppProvider";
import { alertAction } from "../../../components/store/reducers/alert";
import * as yup from "yup";

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

  const { state, dispatch } = useAppState();
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
          alertAction.alertShow(dispatch!, {
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
        <Box className="mb-4">
          <Typography className="mb-2" variant="h3">
            {AppContent.signUp}
          </Typography>
          <Typography variant="body2" className="mb-4">
            {AppContent.dontHaveAccount}
            <Link className="text-secondary" href="/signup">
              {AppContent.signUp}
            </Link>
          </Typography>
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
    </>
  );
};

export default SigninForm;
