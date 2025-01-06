import Link from "next/link";
import Events from "./tickets";

export default function Home(){
  return(
<div className="container">
    <Events
    
    />
    <Link href="/events" className="text-[#387478] my-3">see more events</Link>
    
  <div className="flex flex-col gap-5 justify-center items-center rounded-xl text-white px-20 py-16 bg-[#387478]/80 mt-10">
    <h1>Are you hosting a Concert, Seminar or Sports Event? We can help!</h1>
    <Link href="/vendor" className="bg-neutral-50 py-4 px-10 rounded-xl text-[#387478]"> + Create New Event</Link>
              </div>
    </div>
  )
}