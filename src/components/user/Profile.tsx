"use client";

import { IUserDoc } from "@/models/user";
import { useFormik } from "formik";
import { memo, useEffect } from "react";

export interface UserProps {
  user: IUserDoc;
  cookie: any;
}
const Profile = ({ user, cookie }: UserProps) => {
  console.log("user", user);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },
    async onSubmit(values, formikHelpers) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user/me",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: `${cookie}`,
          },
          body: JSON.stringify(values),
        }
      );

      console.log("data", response);
    },
  });

  useEffect(() => {
    if (user) {
      setValues((prev) => ({ ...prev, ...user }));
    }
  }, [user, setValues]);
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled
      />
      <input
        name="mobile"
        value={values.mobile}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default memo(Profile);
