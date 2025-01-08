import Link from "next/link";

export default function CreateNew() {
    return(
        <div className="flex flex-col gap-5 justify-center items-center rounded-xl text-white lg:px-20 px-10 lg:py-16 py-8 bg-[#387478]/80 mt-10">
        <h1>Are you hosting a business, Seminar, entertaiment or food Event? We can help!</h1>
        <Link href="/Login/promotor" className="bg-neutral-50 py-4 px-10 rounded-xl text-[#387478]"> + Create New Event</Link>
         </div>
    )
}
