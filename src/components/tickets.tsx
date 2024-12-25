'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface IDetails {
  price: string;
  category: "VIP" | "Cat1" | "Cat2" | "festivalPass" | "free";
  quota: number;
  slug: string
}

export default function Description({
  price,
  category,
  quota,
  slug
}: IDetails) {
  const router = useRouter()
  const [isDisable, setIsDisable] = useState<boolean> (false)
  useEffect(() => {
    if (quota === 0) {
      setIsDisable(true);
    }
  }, [quota]);

  return (
    <div className="flex flex-col">
     
        <div className="bg-[#387874]/90 px-3 py-2 rounded-t-xl text-white font-bold text-lg "> {category}</div>
      <div className="bg-neutral-200 px-8 py-4 rounded-b-xl gap-5 flex flex-col justify-center mb-10">
      <div className="flex justify-between">
        <div className="text-lg">
        {price == "0" ? "Free" : price}
        </div>
        <input type="number" defaultValue={quota == 0 ? 0 : 1} min={1} max={quota > 10 ? 10 : quota} disabled = {quota == 0 ? true: false} className="w-[60px]"/>
      </div>
      <hr />
        <button onClick={() => {router.push(`${slug}/transaction`)}} disabled={isDisable} className={`rounded-lg py-2 mx-40 text-white border border-white ${isDisable? `bg-neutral-400 hover:cursor-not-allowed` : `bg-[#387874]  hover:bg-[#387874]/80` }`}>{quota == 0 ? `Sold Out` : `Buy Ticket`}</button>
      </div>
    </div>
  );
}
