"use client";

import { ratingSchema } from "@/libs/schema";
import { ReviewInput } from "@/types/type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

const initialValues: ReviewInput = {
  desc: "",
  rating: "",
};
interface review {
  EventId: number;
}
function Review({ EventId }: review) {
  const [isLoading, setIsLoading] = useState(false);
  const id = EventId;
  const onCreate = async (data: ReviewInput) => {
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("User not logged in");
    }
    try {
      setIsLoading(true);
      const res = await fetch(`https://ate-backend.vercel.app/api/review/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
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
    <div className="flex justify-center items-center  lg:w-[90vw] w-screen my-5">
      <div className="lg:mx-20 mx-3 my-5 w-[900px] bg-neutral-200 shadow-md lg:px-20 px-5 lg:py-10 py-5 rounded-xl">
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
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      props.setFieldValue("desc", value);
                    }}
                  />
                  <ErrorMessage name="desc" component="span" className="text-sm text-red-500" />
                </div>
                <div className="flex sm:justify-end mt-3">
                  <button type="submit" disabled={isLoading} className=" lg:h-[40px] h-[35px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] min-w-[130px] text-[#f5f5f7] bg-[#387874] hover:bg-[#387872]/60 focus:ring-1 rounded-lg">
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
