"use client";

import { Input } from "@/components/form/input";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import Link from "next/link";
import { toastErr } from "@/helpers/toast";
import { useRouter } from "next/navigation";

// const base_url = process.env.BASE_URL_BE;

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match!")
    .required("Confirm password is required"),
  reffered_by: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z0-9]{6}$/,
      "Referral Code should contain 6 alphanumeric characters"
    ),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  reffered_by: string;
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    reffered_by: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("https://ate-backend.vercel.app/api/auth/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong ");
      toast.success("Register Success");
      router.push("/");
    } catch (err) {
      toastErr(err);
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
            <Link href={"/Login/users"} className="text-[#387478] font-bold">
              Sign In
            </Link>
          </p>
        </div>

        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={async (values, action) => {
            setIsLoading(true); // Set loading to true sebelum request
            await handleAdd(values); // Panggil handleAdd untuk proses POST
            action.resetForm(); // Reset form setelah berhasil
            setIsLoading(false); // Set loading ke false setelah selesai
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form className="flex flex-col gap-5">
                <Input formik={props} name="username" label="Username*" />
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
                  name="confirmPassword"
                  label="Confirm Password*"
                  type="password"
                />
                <Input
                  formik={props}
                  name="reffered_by"
                  label="Referral Code (optional)"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 text-white rounded-md font-medium ${
                    isLoading
                      ? "bg-[#94b6b3] cursor-not-allowed"
                      : "bg-[#387478] hover:bg-[#629584]"
                  }`}
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
