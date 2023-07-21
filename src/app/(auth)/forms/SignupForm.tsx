"use client";
import { signup } from "@/lib/auth";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useContext, useState } from "react";
import Link from "next/link";
import Form from "../../../components/controls/Form";
import Button from "../../../components/controls/Button";
import Input from "../../../components/controls/Input";
import FormGroup from "../../../components/controls/FormGroup";
import Row from "../../../components/controls/Row";
import Col from "../../../components/controls/Col";
import Box from "../../../components/controls/Box";
import * as yup from "yup";
import Typography from "../../../components/controls/Typography";
import { AppContext } from "../../../components/providers/AppProvider";
import { alertAction } from "../../../components/store/reducers/alert";
import Alert from "../../../components/controls/Alert";
import { Action, AppDispatch } from "../../../components/store";

const validation = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email id").required("Email is requried"),
  password: yup.string().required("Password is required!"),
  mobile: yup.string().required("Mobile is requried!"),
});
/**
 * Sign-in component
 * @returns
 */
interface SigninProps {
  onChange?: MouseEventHandler<HTMLAnchorElement>;
}
const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { alertState } = state;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        mobile: "",
      },
      validationSchema: validation,
      async onSubmit(values, {}) {
        setLoading(true);

        const result = await signup(values);
        const data = await result.json();

        if (data.errors) {
          alertAction.alertShow(dispatch, {
            message: data.errors.message,
            color: "danger",
          });
        }

        if (result.status === 201) {
          setTimeout(() => {
            router.replace("/signin");
          }, 3000);
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
          <Typography variant="body2">
            If you have an account, please click on{" "}
            <Link className="text-secondary" href="/signin">
              Sign in
            </Link>
          </Typography>
        </Box>
        <Row>
          <Col>
            <FormGroup>
              <Input
                name="name"
                type="text"
                placeholder="Enter full name"
                value={values.name}
                errors={errors}
                touched={touched}
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
                errors={errors}
                touched={touched}
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
            errors={errors}
            touched={touched}
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
            errors={errors}
            touched={touched}
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
