"use client";
import { signup } from "@/lib/auth";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
/**
 * Sign-in component
 * @returns
 */
const SignupForm = () => {
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
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {loading && <p>{AppContent.signUpWait}</p>}
      <input
        name="name"
        type="text"
        placeholder="Enter full name"
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email id"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="***********"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        name="mobile"
        type="text"
        placeholder="Mobile no"
        value={values.mobile}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? AppContent.loading : AppContent.signUp}
      </button>
    </form>
  );
};

export default SignupForm;
