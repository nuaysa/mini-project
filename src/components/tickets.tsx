<<<<<<< HEAD
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
=======
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";

interface ICard {
  title: string;
  thumbnail: string;
  avatar: string;
  price: string;
  vendor: string;
  slug: string;
  category: string;
  location: string;
  time:string;
  status: String;
}

export default function Events({
  title,
  thumbnail,
  avatar,
  vendor,
  price,
  slug,
  category,
  location,
  time, 
  status
}: ICard) {
  return (
    <div className="flex">
    <Sidebar/>
    <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full rounded-xl p-10">
    <div className="grid grid-cols-3 grid-rows-3">
    <Link 
          href={`/ticket/${slug}`} className="bg-white border w-[300px] border-gray-200 rounded-xl  shadow">
      <div className="rounded-t-xl h-[200px] relative overflow-hidden shadow">
        <Image
          className="object-fill rounded-t-lg hover:scale-110"
          src={``}
          alt={title}
          fill
          priority
        />
        <span className=" absolute bg-gray-600 text-white px-2 m-2 right-0 text-xs rounded-sm ">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h5 className="mb-2 text-md font-bold line-clamp-2 tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <h5 className="mb-2 text-md font-bold line-clamp-2 tracking-tight text-[#387478] dark:text-white">
          {location}
        </h5>
        <h5 className="mb-2 text-md font-bold line-clamp-2 tracking-tight text-[#387478] dark:text-white">
          {time}
        </h5>
        <h5 className="mb-2 text-md font-bold line-clamp-2 tracking-tight text-[#387478] dark:text-white">
          {price}
        </h5>
        <div className="flex items-center my-5">
          <div className="w-10 h-10 relative">
            <Image
              className="rounded-full object-cover"
              src={``}
              alt={vendor}
              fill
              priority
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {vendor}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {}
            </p>
          </div>
        </div>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          Buy Ticket
        </button>
      </div>
    </Link>
    </div>
    </div>
    </div>
    )
}
>>>>>>> main
