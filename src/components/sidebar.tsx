import Link from "next/link";

export default function Sidebar() {
    return(
        <div className="w-[300px] top-0 z-10 bg-neutral-200 h-[695px] py-10 px-2">
            <div className="flex flex-col items-center gap-6 text-[#387478] text-xl">
            <h1>Ticket Categories</h1>
                <Link href="" className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                    icon
                    <h1>Sport</h1>
                </Link>
                <Link href="" className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                    icon
                    <h1>Seminar</h1>
                </Link>
                <Link href="" className="flex flex-col justify-center items-center text-sm  bg-neutral-100 shadow-md w-[150px] h-[150px] rounded-xl">
                    icon
                    <h1>Entertaiment</h1>
                </Link>
            </div>
        </div>
    )
}