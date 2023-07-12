"use client";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthProvider from "../providers/AuthProvider";
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
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {message}
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
      <AuthProvider />
    </>
  );
};

export default SigninForm;
