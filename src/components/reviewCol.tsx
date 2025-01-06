"use client";

import { ratingSchema } from "@/libs/schema";
import { ReviewInput } from "@/types/type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FieldThumbnail } from "./thumbnail";

const initialValues: ReviewInput = {
  desc: "",
  rating: "good",
};

interface review {
  EventId: number;
}

function Review({ EventId }: review) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = EventId;
  const onCreate = async (data: ReviewInput) => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (const key in data) {
        const item = data[key as keyof ReviewInput];
        if (item) {
          // formData.append(key, item);
        }
      }
      const res = await fetch(`https://ate-backend.vercel.app/api/review/${id}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success("review sent🚀");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send review");
    } finally {
      setIsLoading(false);
    }

    }

  return (
    <div className="flex justify-center items-center bg-neutral-200 w-[98.8vw] pt-40">
      <div className="container mx-20 my-20 w-[900px] bg-neutral-100 shadow-md px-20 py-10 rounded-xl mt-36">
        <Formik
          initialValues={initialValues}
          validationSchema={ratingSchema}
          onSubmit={(values, actions) => {
            onCreate(values);

            actions.resetForm();
          }}
        >
          {(props) => {
            return (
              <Form className="flex flex-col gap-3 justify-center">
                <div>
                  <label htmlFor="rating" className="block mb-2 text-sm w-max font-medium text-gray-900">
                    Ratings
                  </label>
                  <Field name="Ratings" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                    <option value="">~ Ratings ~</option>
                    <option value="bad">🥱</option>
                    <option value="notBad">😐</option>
                    <option value="good">🙂</option>
                    <option value="fantastic">🤩</option>
                  </Field>
                  <ErrorMessage name="category" component="span" className="text-sm text-red-500" />
                </div>
                <div>
                  <label htmlFor="desc" className="block mb-2 text-sm w-max font-medium text-gray-900">
                    Review
                  </label>
                  <Field
                    name="Review"
                    type="text"
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      props.setFieldValue("desc", value);
                    }}
                  />
                  <ErrorMessage name="desc" component="span" className="text-sm text-red-500" />
                </div>
                <div className="flex sm:justify-end mt-3">
                  <button type="submit" disabled={isLoading} className=" h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-[#387874] hover:bg-[#387872]/60 focus:ring-1 rounded-lg">
                    {isLoading ? "Loading..." : "Send"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Review;
