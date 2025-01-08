"use client";

import React, { useEffect, useState } from "react";
import { createSlug } from "@/helpers/createSlug";
import { Formik, Field, ErrorMessage, Form } from "formik";
import RichTextEditor from "@/components/textEditor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EventInput } from "@/types/type";
import { eventSchema } from "@/libs/schema";
import { FieldThumbnail } from "@/components/thumbnail";
import { revalidate } from "@/libs/action";

const initialValues: EventInput = {
  title: "",
  slug: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  venue: "",
  maps: "",
  type: "",
  thumbnail: "",
};

function EventCreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      if (typeof window !== 'undefined') {
        setToken(localStorage.getItem("token"));
      }
    }, []);
  
    const onCreate = async (data: EventInput) => {
      if (!token) {
        toast.error("Token is missing");
        return;
      }
      try {
        setIsLoading(true);
        const formData = new FormData();
      //   for (const key in data) {
      //     if (key) {  
      //       const item = data[key as keyof EventInput];
      //     if (item !== undefined && item !== null) {
      //       if (typeof item === "string" || typeof item === "number") {
      //         formData.append(key, item.toString());
      //       } else if (item instanceof Date) {
      //         formData.append(key, item.toISOString());
      //       }
      //     }
      //   }
      // }
      for (const key in data) {
        const item = data[key as keyof EventInput];
        if (item) {
          formData.append(key, item);
        }
      }
          const res = await fetch(`https://ate-backend.vercel.app/api/events/`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          const result = await res.json();
          if (!res.ok) throw result;
      revalidate("events");
          toast.success(result.message);
          router.push(`/createEvent/Ticket/${result.data.id}`);
        } catch(err) {
          toast.error("create event failed")
          console.error(err);
        } finally {
          setIsLoading(false);
        }

    }
  return (

    <div className="flex justify-center items-center">

    <div className="container mx-20 my-20 w-[900px] bg-neutral-100 shadow-md px-20 py-10 rounded-xl">

      <Formik
        initialValues={initialValues}
        validationSchema={eventSchema}
        onSubmit={(values, actions) => {
          onCreate(values);
          // actions.resetForm();
        }}
      >
        {(props) => {
          console.log(props.errors)
          return (
            <Form className="flex flex-col gap-3 justify-center">
              <div>
                <label htmlFor="thumbnail" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Thumbnail
                </label>
                <FieldThumbnail name="thumbnail" formik={props} />
                <ErrorMessage name="thumbnail" component="span" className="text-sm text-red-500" />
              </div>
              <div>
                <label htmlFor="title" className="block mb-2 text-sm w-max font-medium text-gray-900">

                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    props.setFieldValue("title", value);
                    props.setFieldValue("slug", createSlug(value));
                  }}
                />
                <ErrorMessage name="title" component="span" className="text-sm text-red-500" />
              </div>
              <div>
                <label htmlFor="slug" className="block mb-2 text-sm w-max font-medium text-gray-900">

                  Slug
                </label>
                <input type="text" name="slug" value={props.values.slug} readOnly disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2" />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Category
                </label>
                <Field name="category" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                  <option value=""> Category </option>
                  <option value="sport">Sport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="food">Food</option>
                  <option value="seminar">seminar</option>
                </Field>
                <ErrorMessage name="category" component="span" className="text-sm text-red-500" />
              </div>
              <div>
                <label htmlFor="type" className="block mb-2 text-sm w-max font-medium text-gray-900">

                  Ticket Type
                </label>
                <Field name="type" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                  <option value=""> Ticket Type </option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                  </Field>
                <ErrorMessage name="type" component="span" className="text-sm text-red-500" />
              </div>

              <div className="flex gap-10">
                <span className="flex flex-col">
                <label htmlFor="date" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Date
                </label>
                <Field
                  name="date"
                  type="Date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    console.log(value)
                    props.setFieldValue("date", value);
                  }}
                />
                <ErrorMessage name="date" component="span" className="text-sm text-red-500" />
                  </span>

                <span className="flex flex-col">
                <label htmlFor="time" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Time
                </label>
                
                <Field
                  name="time"
                  type="Time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    console.log(value)
                    props.setFieldValue("time", value);
                  }}
                />
                <ErrorMessage name="time" component="span" className="text-sm text-red-500" />
                  </span>
              </div>

              <div className="flex gap-10">
                <span className="flex flex-col">

               

                <label htmlFor="Location" className="block mb-2 text-sm w-max font-medium text-gray-900">

                </label>
                <Field name="location" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                  <option value=""> Location </option>
                  <option value="Bandung">Bandung</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bogor">Bogor</option>
                  <option value="Depok">Depok</option>
                  <option value="Tanggerang">Tanggerang</option>
                  <option value="Bekasi">Bekasi</option>
                  </Field>
                <ErrorMessage name="location" component="span" className="text-sm text-red-500" />
  

                  </span>

                <span className="flex flex-col">
                <label htmlFor="venue" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Venue
                </label>
                
                <Field
                  name="venue"
                  type="Venue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    props.setFieldValue("venue", value);
                  }}
                />
                <ErrorMessage name="venue" component="span" className="text-sm text-red-500" />
                  </span>
              </div>
              <div>
                <label htmlFor="maps" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Map URL
                </label>
                <Field
                  name="maps"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    props.setFieldValue("maps", value);
                  }}
                />
                <ErrorMessage name="maps" component="span" className="text-sm text-red-500" />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 text-sm w-max font-medium text-gray-900">
                  Description
                </label>
                <RichTextEditor setFieldValue={props.setFieldValue} />
                <ErrorMessage name="description" component="span" className="text-sm text-red-500" />
              </div>
              <div className="flex sm:justify-end mt-3">
                <button 
                type="submit" disabled={isLoading} className=" h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-[#387874] hover:bg-[#387872]/60 focus:ring-1 rounded-lg">
                  {isLoading ? "Loading..." : "Continue"}
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

export default EventCreatePage;
