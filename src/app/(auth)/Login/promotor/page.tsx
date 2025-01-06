"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/context/useSession";
import { Form, Formik, FormikProps } from "formik";
import { Input } from "@/components/form/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { toastErr } from "@/helpers/toast";

// const base_url = process.env.BASE_URL_BE;

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("username or email is required"),
  password: Yup.string()
    .min(3, "password must be 3 characters at minimum")
    .required("password is required"),
});

interface FormValues {
  name: string;
  password: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsAuth, setUser } = useSession();
  const router = useRouter();
  const initialValue: FormValues = {
    name: "",
    password: "",
  };

  const handleLogin = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("https://ate-backend.vercel.app/api/auth/loginPromotor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      localStorage.setItem("token", result.token);
      setIsAuth(true);
      setUser(result.user);
      router.push("/");
      toast.success(result.message);
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
          <h1 className="text-3xl font-bold text-gray-950">Sign In</h1>
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link href={"/Register/promotor"} className="text-[#387478] font-bold">
              Sign Up
            </Link>
          </p>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={(values, action) => {
            handleLogin(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form className="flex flex-col gap-5">
                <Input
                  formik={props}
                  name="name"
                  label="organisation name Or Email :"
                  placeholder="organisation name or email"
                />
                <Input
                  formik={props}
                  name="password"
                  label="Password :"
                  type="password"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-[#387478] text-white rounded-md hover:bg-[#629584] disabled:bg-[#94b6b3] font-medium"
                >
                  {isLoading ? "Loading ..." : "Sign in"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
