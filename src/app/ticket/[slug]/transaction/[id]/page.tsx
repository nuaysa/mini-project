"use client";
import Compmodal from "@/components/modal";
import { formatPrice } from "@/helpers/priceFormat";
import { getEventSlug, getTicketId } from "@/libs/events";
import { IEvents, ITicket } from "@/types/type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  voucher: Yup.string().matches(/^[A-Za-z0-9]+$/, "Voucher hanya boleh alfanumerik."),
  points: Yup.number().max(50000, "Max 50000 points").min(0, "Min 0 points"),
});

export default function Transaction({ params }: { params: { slug: string; id: number; qty: number } }) {
  const router = useRouter()
  const searchParams = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 0;
  const [event, setEvent] = useState<IEvents>();
  const [ticket, setTicket] = useState<ITicket>();
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [voucher, setVoucher] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      voucher: "",
      points: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setVoucher(values.voucher);
      setPoints(values.points);
    },
  });

  useEffect(() => {
    const calculateDiscount = () => {
      const pointsDiscount = points || 0;
      const voucherDiscount = ticket?.price! * Number(qty) * 0.1 || 0;
      const combinedDiscount = pointsDiscount + voucherDiscount;
      setDiscount(combinedDiscount);
    };

    calculateDiscount();
  }, [points, voucher]);


  const handleTransaction = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/transaction/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "basePrice": ticket?.price!,
          "qty": 1,
          // "userVoucher": `${voucher? voucher : null}`,
          // "userPoints": `${points ? points : null}`,
        }),
      })
      const result = await res.json();
      if (!res.ok) throw result;
      router.push(result.data.redirect_url)
      toast.success("Transaction Successful");
    } catch (error) {
      console.log(error, "tes");
      toast.error("Transaction Failed");
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvent(params.slug);
    getTicket(params.id);
  }, []);

  const getEvent = async (slug: string) => {
    setEvent(await getEventSlug(slug));
  };

  const getTicket = async (id: number) => {
    setTicket(await getTicketId(id));
  };

  return (
    <div className="bg-white min-h-screen h-[1100px] flex justify-center items-center">
      <div className="bg-neutral-200 h-max max-w-[900px] min-w-[600px] absolute flex flex-col justify-center rounded-xl p-10">
        <h1 className="text-[#387874] text-2xl font-bold">Event: </h1>
        <h1 className="font-semibold text-xl mb-2">
          {event?.title!} || {event?.location!}
        </h1>
        <div className="h-[300px] rounded-xl relative overflow-hidden shadow mt-1">
          <Image className="object-fill" src={event?.thumbnail!} alt={event?.title!} fill priority />
        </div>
        <hr className="w-full border border-1 " />
        <h1 className="text-[#387874] text-2xl font-bold mt-3 mb-2">Payment Info: </h1>
        <div className="flex justify-between">
          <h1 className="mt-1"> Ticket Category: </h1>
          <h1 className="mt-1 text-gray-700"> {ticket?.category!} </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="mt-1"> Ticket Quantity: </h1>
          <h1 className="mt-1 text-gray-700"> {qty}x </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="mt-1"> Price: </h1>
          <h1 className="mt-1 text-gray-700"> {formatPrice(ticket?.price!)} </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="mt-1"> Subtotal:</h1>
          <h1 className="mt-1 text-gray-700"> {formatPrice(ticket?.price! * Number(qty))} </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="mt-1"> Discount:</h1>
          <h1 className="mt-1 text-gray-700"> {formatPrice(discount? discount : 0)} </h1>
        </div>
        <hr className="border-t-2 borer-gray-300 my-4" />
        <div className="flex justify-between">
          <h1 className="mt-1 font-semibold">Total:</h1>
          <h1 className="mt-1 text-gray-700 font-semibold">
            {formatPrice(ticket?.price! * Number(qty) - discount)}
          </h1>
        </div>
      {ticket?.discount == false ? (
        <div className="text-red-500 text-sm">Discount not available</div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4 bg-neutral-100 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center">
          <label htmlFor="points" className="text-md">
            Points Id:
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={formik.values.points}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border rounded-lg w-1/2 p-2"
          />
          {formik.touched.points && formik.errors.points ? (
            <div className="text-red-500 text-sm">{formik.errors.points}</div>
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="voucher" className="text-md">
            Voucher Id:
          </label>
          <input
            type="text"
            id="voucher"
            name="voucher"
            value={formik.values.voucher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border rounded-lg w-1/2 p-2"
          />
          {formik.touched.voucher && formik.errors.voucher ? (
            <div className="text-red-500 text-sm">{formik.errors.voucher}</div>
          ) : null}
        </div>

        <button type="submit" className="bg-[#387874] text-white rounded-lg p-2 mt-4">
          Submit
        </button>
      </form>

      )}
        
        <br />
        <div className="flex justify-center">
          <Compmodal handleTransaction={handleTransaction} />
        </div>
      </div>
    </div>
  );
}
