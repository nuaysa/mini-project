"use client";
import Compmodal from "@/components/modal";
import { formatPrice } from "@/helpers/priceFormat";
import { getEventSlug, getTicketId } from "@/libs/events";
import { IEvents, ITicket } from "@/types/type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Transaction({ params }: { params: { slug: string; id: number } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 0;

  const [event, setEvent] = useState<IEvents | null>(null);
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [voucherId, setVoucherId] = useState<number | null>(null);
  const [pointsId, setPointsId] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState<number[]>([]);
  const [userVoucher, setUserVoucher] = useState<number[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await getEvent(params.slug);
        await getTicket(params.id);
        await getPoints();
        await getVoucher();
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialData();
  }, [params.slug, params.id]);

  const getPoints = async () => {
    try {
      
      const res = await fetch("https://ate-backend.vercel.app/api/coupon/points", {  
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
      const data = await res.json();
      console.log(data)
      setPointsId(data.points?.id || null);
      setUserPoints(data.userPoints || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getVoucher = async () => {
    try {
      const res = await fetch("https://ate-backend.vercel.app/api/coupon/voucher", {  
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
      const data = await res.json();
      console.log(data)
      setVoucherId(data.voucher?.id || null);
      setUserVoucher(data.userVoucher || []);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateDiscount = () => {
    if (qty <= 0 || !ticket?.price) {
      toast.error("Invalid quantity or ticket price");
      return;
    }

    let pointsDiscount = 0;
    let voucherDiscount = 0;

    if (pointsId && userPoints.includes(pointsId)) {
      pointsDiscount = 10000; // Contoh diskon poin 5%
    }

    if (voucherId && userVoucher.includes(voucherId)) {
      voucherDiscount = ticket.price * qty * 0.1; // Diskon 10% dengan voucher
    }

    setDiscount(pointsDiscount + voucherDiscount);
  };

  useEffect(() => {
    calculateDiscount();
  }, [pointsId, voucherId, userPoints, userVoucher, ticket?.price, qty]);

  const handleTransaction = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/transaction/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          basePrice: ticket?.price,
          qty,
          userVoucher: voucherId || null,
          userPoints: pointsId || null,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw result;

      router.push(result.data.redirect_url);
      toast.success("Transaction Successful");
    } catch (error) {
      toast.error("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (slug: string) => {
    const fetchedEvent = await getEventSlug(slug);
    setEvent(fetchedEvent);
  };

  const getTicket = async (id: number) => {
    const fetchedTicket = await getTicketId(id);
    setTicket(fetchedTicket);
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
      {!ticket?.discount ? (
        <div className="text-red-500 text-sm">Discount not available</div>
      ) : (
        <div className="flex flex-col gap-3 bg-neutral-100 py-8 px-8 rounded-xl mt-2">
          <h1>Use Discount ?</h1>
          <div className="flex justify-evenly">
            <button className="bg-[#387874] rounded-lg py-3 text-white px-5">Use Point</button>
            <button className="bg-[#387874] rounded-lg py-3 text-white px-5">Apply Voucher</button>
          </div>
        </div>
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