import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

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
export default function Card({
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
    <div className="flex flex-col bg-neutral-100 w-full rounded-xl">
    <Link
          href={`/ticket/${slug}`} className="bg-white border w-[350px] border-gray-200 rounded-xl  shadow">
      <div className="rounded-t-xl h-[200px] relative overflow-hidden shadow">
        <Image
          className="object-fill rounded-t-lg hover:scale-110"
          src='https://cdn-icons-png.flaticon.com/512/8480/8480293.png'
          alt={title}
          fill
          priority
        />
        <span className=" absolute bg-[#387478]/80 text-white px-3 m-1 right-0 text-xs rounded-lg ">
          {/* {category} */} sport
        </span>
      </div>
      <div className="px-4 pt-2 ">
        <h5 className="mb-2 text-lg font-bold line-clamp-2 tracking-tight text-gray-900">
          {/* {title} */} An Event
        </h5>
        <h5 className="flex gap-2 items-center mb-1 text-sm font-bold line-clamp-2 tracking-tight text-[#387478]">
        <FaLocationDot />{/* {location} */} here
        </h5>
        <h5 className="flex gap-2 items-center mb-1 text-sm font-bold line-clamp-2 tracking-tight text-[#387478]">
        <FaCalendarAlt /> {/* {time} */} 4 Dec 2024
        </h5>
        <h5 className="flex gap-2 items-center mb-1 text-sm font-bold line-clamp-2 tracking-tight text-[#387478]">
        <FaMoneyBill />{/* {price} */} 100.000
        </h5>
        <div className="flex items-center my-5">
          <div className="w-10 h-10 relative">
            <Image
              className="rounded-full border border-[#387478]/80 object-cover"
              src='https://cdn-icons-png.flaticon.com/512/8480/8480293.png'
              alt='organizer'
              fill
              priority
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate">
              {/* {vendor} */} organizer
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {}
            </p>
          </div>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#387478]/90 rounded-lg hover:bg-[#387478] focus:ring-4 focus:outline-none focus:ring-teal-300"
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