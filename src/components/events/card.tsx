
import { formatDate } from "@/helpers/dateFormat";
import { formatPrice } from "@/helpers/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface ICard {
  title: string;
  thumbnail: string;
  logo: string;
    price: number;
    slug: string;
    category: string;
    location: string;
    time:Date;
    organizer: string;
  }
export default function Card({
    title,
    thumbnail,
    price,
    slug,
    category,
    location,
    time, 
    organizer,
    logo
  }: ICard) {
    return (
   <div className="flex justify-center">

    <div className="flex bg-neutral-100 justify-center rounded-xl pt-10 mt-3">
      <Link
          href={`/ticket/${slug}`} className="bg-white border w-[350px] h-[440px] mt-2 border-gray-200 rounded-xl shadow">
      <div className="rounded-t-xl h-[240px] relative overflow-hidden shadow">

        <Image
          className="object-fill rounded-t-lg hover:scale-110"
          src={thumbnail}
          alt={title}
          fill
          priority
        />
        <span className=" absolute bg-[#387478]/80 text-white px-3 m-1 right-0 text-xs rounded-lg ">
          {category}
        </span>
      </div>
      <div className="px-4 pt-2">
        <h5 className="mb-2 text-lg font-bold line-clamp-2 tracking-tight text-gray-900">
          {title}
        </h5>
        <h5 className="flex gap-2 items-center mb-1 text-sm font-bold line-clamp-2 tracking-tight text-[#387478]">
        <FaLocationDot /> {location} 
        </h5>
        <h5 className="flex gap-2 items-center mb-1 text-sm font-bold line-clamp-2 tracking-tight text-[#387478]">
        <FaCalendarAlt />  {formatDate(time.toString())} 
        </h5>
        <h5 className="flex gap-2 items-center mb-1 text-sm font-bold line-clamp-2 tracking-tight text-[#387478]">
        <FaMoneyBill /> {price == 0 ? "Free" : `${formatPrice(price)}`}
        </h5>
        <div className="flex items-center my-5">
          <div className="w-10 h-10 relative">
            <Image
              className="rounded-full border border-[#387478]/80 object-cover"
              src={logo}
              alt='organizer'
              fill
              priority
              />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-extralight text-gray-900 truncate">
              {organizer}
            </p>
          </div>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#387478]/90 rounded-lg hover:bg-[#387478] focus:ring-4 focus:outline-none"
        >
          Buy Ticket
        </button>
        </div>
      </div>
    </Link>
    </div>
   </div>
) 
}