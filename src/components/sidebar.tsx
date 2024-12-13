import Link from "next/link";
import { FiBriefcase } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiProjectorScreen } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";

export default function Sidebar() {
    const link = `http://localhost:3000`
    return(

        <div className="w-[300px] mx-3 top-0 z-10 bg-neutral-200 h-full py-10 px-2 rounded-b-lg">
            <div className="hidden lg:flex lg:flex-col items-center gap-6 text-[#387478] text-xl">
            <h1>Ticket Categories</h1>
                <Link href= '' className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                <FiBriefcase className="text-3xl"/>
                    <h1>Business</h1>
                </Link>
                <Link href="" className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                <PiProjectorScreen className="text-3xl"/>
                    <h1>Seminar</h1>
                </Link>
                <Link href="" className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                <TbMovie className="text-3xl"/>
                    <h1>Entertaiment</h1>
                </Link>
                <Link href="" className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                <IoFastFoodOutline className="text-3xl"/>
                    <h1>Food</h1>
                </Link>
            </div>
        </div>
    )
}