"use client";
import Compmodal from "@/components/modal";
import { formatPrice } from "@/helpers/priceFormat";
import { getEventSlug, getTicketId } from "@/libs/events";
import { IEvents, ITicket } from "@/types/type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  voucher: Yup.number(),
  points: Yup.number().max(50000, "Max 50000 points").min(0, "Min 0 points")
  .test(`is-multiple-of-10000`, `Amount must be a multiple of 10.000`, (value) => {
    if (value === null || value === undefined) return true; 
      return value % 10000 === 0 || value === 0  }),
});

export interface userPoints {
  points:number
}
export default function Transaction({ params }: { params: { slug: string; id: number; qty: number } }) {
  const router = useRouter()
  const searchParams = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 0;
  const [event, setEvent] = useState<IEvents>();
  const [ticket, setTicket] = useState<ITicket>();
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [voucher, setVoucher] = useState<number | null>(null);
  const [points, setPoints] =useState<number | null>(null);
  const [userPoints, setUserPoints] =useState<number[] | null>(null);
  const [userVoucher, setUserVoucher] =useState<number[] | null>(null);

  const formik = useFormik({
    initialValues: {
      voucher: 0,
      points: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setVoucher(values.voucher);
      setPoints(values.points);
    },
  });

  const getPoints = async () => {
    try{
      const res = await fetch(`https://ate-backend.vercel.app/api/coupon/points`,
        {next: {revalidate: 0}})
        const data = await res.json()
        const points = data.points
        setUserPoints(points)
    }catch(err){
      console.log(err)
    }
  }

  const getVoucher = async () => {
    try{
      const res = await fetch(`https://ate-backend.vercel.app/api/coupon/voucher`,
        {next: {revalidate: 0}})
        const data = await res.json()
        const voucher = data.voucher
        setUserVoucher(voucher)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const calculateDiscount = () => {
      if (!userPoints || !userVoucher) {
        if(points){
          return toast.error("invalid points")
        }
        if(voucher){
          return toast.error("invalid points")
        }
        else{
          return
        }
      }; 
  
      let pointsDiscount = 0; 
      let voucherDiscount = 0; 
  
      if (points && points <= userPoints.reduce((a,b) => a+b)) {
        pointsDiscount = points; 
      }
  
      if (voucher && userVoucher.includes(voucher)) {
        voucherDiscount = (ticket?.price! * Number(qty)) * 0.1; 
      }
  
      const combinedDiscount = pointsDiscount + voucherDiscount;
      setDiscount(combinedDiscount);
    };
  
    calculateDiscount();
  }, [points, voucher, userPoints, userVoucher, ticket?.price, qty]);
  

  const handleTransaction = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://ate-backend.vercel.app/api/transaction/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "basePrice": ticket?.price!,
          "qty": qty,
          "userVoucher": voucher? voucher : null,
          "userPoints": points ? points : null,
        }),
      })
      const result = await res.json();
      if (!res.ok) throw result;
      router.push(result.data.redirect_url)
      toast.success("Transaction Successful");
    } catch (error) {
      toast.error("Transaction Failed");
    }finally{
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getEvent(params.slug);
    getTicket(params.id);
    getPoints();
    getVoucher()
  }, []);

  const getEvent = async (slug: string) => {
    setEvent(await getEventSlug(slug));
  };

  const getTicket = async (id: number) => {
    setTicket(await getTicketId(id));
  };

  return (
    <>
    <div className="bg-white min-h-screen h-[1100px] flex justify-center items-center">
      <div className="bg-neutral-200 h-max lg:w-[600px] min-w-[400px] absolute flex flex-col justify-center rounded-xl p-10">
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
      {ticket?.discount == false  ? (
        <div className="text-red-500 text-sm">Discount not available</div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4 bg-neutral-100 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center">
          <label htmlFor="points" className="text-md">
            Points:
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
          {formik.touched.points && formik.errors.points && getPoints.length == 0 ? (
            <div className="text-red-500 text-sm">{formik.errors.points}</div>
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="voucher" className="text-md">
            Voucher:
          </label>
          <input
            type="checkbox"
            id="voucher"
            name="voucher"
            value={formik.values.voucher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border rounded-lg p-2"
          />
          {formik.touched.voucher && formik.errors.voucher && getVoucher.length == 0 ? (
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
    </>
  );
}
