
"use client"

import { ticketSchema } from "@/libs/schema";
import { TicketInput } from "@/types/type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialValues: TicketInput = {
  price: 0,
  quota: 0,
  category: "",
  startDate: "",
  endDate: "",
  discount: false
};

export default function CreateTicket({ params }: { params: { id: number } }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const EventId = Number(searchParams.get("id"))
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const onCreate = async (data: TicketInput) => {
    if (!token) {
      toast.error("Token is missing");
      return;
    }
    try {
        setIsLoading(true);
        const res = await fetch(`https://ate-backend.vercel.app/api/events/ticket/${params.id}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
        });
        const result = await res.json();
        if (!res.ok) throw result;
    // revalidate("events");
        toast.success(result.message);
        console.log(result)
        router.push("/");
      } catch(err) {
        console.error(err);
        toast.error("ticket failed to create")
      } finally {
        setIsLoading(false);
      }
    };
    return(
        <div>
              <div className="flex justify-center items-center">

<div className="container mx-20 my-20 w-[900px] bg-neutral-100 shadow-md px-20 py-10 rounded-xl">
  <Formik
    initialValues={initialValues}
    validationSchema={ticketSchema}
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
            <label htmlFor="price" className="block mb-2 text-sm w-max font-medium text-gray-900">
              Price
            </label>
            <Field
              name="price"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                props.setFieldValue("price", value);
              }}
            />
            <ErrorMessage name="price" component="span" className="text-sm text-red-500" />
          </div>
    
          <div>
            <label htmlFor="category" className="block mb-2 text-sm w-max font-medium text-gray-900">
              Ticket Category
            </label>
            <Field name="category" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
              <option value=""> Ticket Category </option>
              <option value="VIP">VIP</option>
              <option value="Cat1">Cat 1</option>
              <option value="Cat2">Cat 2</option>
              <option value="festivalPass">Festival Pass</option>
              <option value="free">Free</option>
              </Field>
            <ErrorMessage name="category" component="span" className="text-sm text-red-500" />
          </div>

          <div className="flex gap-10">
            <span className="flex flex-col">

            <label htmlFor="startDate" className="block mb-2 text-sm w-max font-medium text-gray-900">
              Start Date
            </label>
            <Field
              name="startDate"
              type="Date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                props.setFieldValue("startDate", value);
              }}
            />
            <ErrorMessage name="startDate" component="span" className="text-sm text-red-500" />
              </span>

            <span className="flex flex-col">
            <label htmlFor="endDate" className="block mb-2 text-sm w-max font-medium text-gray-900">
              End Date
            </label>
            <Field
              name="endDate"
              type="Date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                props.setFieldValue("endDate", value);
              }}
            />
            <ErrorMessage name="endDate" component="span" className="text-sm text-red-500" />
              </span>
          </div>

          <div className="flex gap-10">
            <span className="flex flex-col">
            <label htmlFor="quota" className="block mb-2 text-sm w-max font-medium text-gray-900">
              Quota
            </label>
            <Field name="quota" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
            
              </Field>
            <ErrorMessage name="quota" component="span" className="text-sm text-red-500" />
              </span>

            <span className="flex flex-col">
            <label htmlFor="discount" className="block mb-2 text-sm w-max font-medium text-gray-900">
              Discount
            </label>
            
            <Field
              name="discount"
              type="checkbox"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                props.setFieldValue("discount", value);
              }}
            />
            <ErrorMessage name="discount" component="span" className="text-sm text-red-500" />
              </span>
          </div>
      

          <div className="flex sm:justify-end mt-3">
            <button  type="submit" disabled={isLoading} className=" h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-[#387874] hover:bg-[#387872]/60 focus:ring-1 rounded-lg">
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </Form>
      );
    }}
  </Formik>
</div>
</div>
        </div>
    )
}
