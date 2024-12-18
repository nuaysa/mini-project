"use client";
import { Input } from "@/components/form/input";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import Link from "next/link";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  Email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not match!")
    .required("Confirm password is required"),
  RefCode: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z0-9]{7}$/,
      "Reference Code contains 7 alphanumeric characters"
    ),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  RefCode: string;
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    RefCode: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-950">Sign Up</h1>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link href={"/Login"} className="text-[#387478] font-bold">
              Sign In
            </Link>
          </p>
        </div>

        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={async (values, action) => {
            action.resetForm();
            await handleAdd(values);
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form className="flex flex-col gap-5">
                <Input 
                formik={props} 
                name="username" 
                label="username*" />
                <Input
                  formik={props}
                  name="email"
                  label="Email*"
                  type="email"
                />
                <Input
                  formik={props}
                  name="password"
                  label="Password*"
                  type="password"
                />
                <Input
                  formik={props}
                  name="confirmpassword"
                  label="Confirm Password*"
                  type="password"
                />
                <Input
                  formik={props}
                  name="Referal Code"
                  label="Referal Code(optional)"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-[#387478] text-white rounded-md hover:bg-[#629584] disabled:bg-[#94b6b3] font-medium"
                >
                  {isLoading ? "Loading..." : "Sign Up Now"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
