"use client";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
/**
 * Sign-in component
 * @returns
 */
const SigninForm = () => {
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
          redirect: false,
          callbackUrl: "/",
          ...values,
        });

        console.log(result);
        if (result?.error) {
          setError(result.error);
        }

        setLoading(false);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {loading && <p>Wait authenticating...</p>}
      <input
        placeholder="Email id"
        name="email"
        type="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        placeholder="***********"
        name="password"
        type="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? AppContent.loading : AppContent.signIn}
      </button>
    </form>
  );
};

export default SigninForm;
