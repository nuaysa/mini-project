
'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface IDetails {
  price: string;
  category: "VIP" | "Cat1" | "Cat2" | "festivalPass" | "free";
  quota: number;
  slug: string
  id: number
}

export default function Description({
  price,
  category,
  quota,
  slug,
  id
}: IDetails) {
  const router = useRouter()
  const [isDisable, setIsDisable] = useState<boolean> (false)
  const [qty, setQty] = useState<number>(0)

  const handleBuyTicket = (qty: number) => {
    if(qty > 0){
    router.push(`${slug}/transaction/${id}?qty=${qty}`);
  }else{
    toast.error("Please input the quantity")
  }};
  

  useEffect(() => {
    if (quota === 0) {
      setIsDisable(true);
    }
  }, [quota]);

  return (
    <div className="flex flex-col">

        <div className="bg-[#387874]/90 px-3 py-2 rounded-t-xl text-white font-bold text-lg "> {category}</div>
      <div className="bg-neutral-200 px-8 py-4 rounded-b-xl flex flex-col justify-center mb-10">
      <div className="flex justify-between">
        <div className="text-lg text-neutral-800 font-semibold">
        {price == "0" ? "Free" : price}
        <br />
        <div className="text-md text-neutral-800 font-light">tickets remaining : {quota == 0 ? "SOLD OUT" : quota}</div>
        </div>
        <input type="number" defaultValue={quota == 0 ? 0 : 1} value={qty} min={1} max={quota > 10 ? 10 : quota}  disabled={quota == 0 ? true: false} className="w-[60px] rounded-xl" onChange={(e) => setQty(parseInt(e.target.value))}/>
      </div>
      <hr />
        <button onClick={() => {handleBuyTicket(qty)}} disabled={isDisable} className={`mt-3 rounded-lg py-2 mx-40 text-white border border-white ${isDisable? `bg-neutral-400 hover:cursor-not-allowed` : `bg-[#387874]  hover:bg-[#387874]/80` }`}>{quota == 0 ? `Sold Out` : `Buy Ticket`} </button>
      </div>
    </div>
  );
}
