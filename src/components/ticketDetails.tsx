import Image from "next/image";
import Description from "./tickets";
import { getEvents, getEventSlug } from "@/libs/events";
import { IEvents } from "@/types/type";

export const generateStaticParams = async () => {
  const events: IEvents[] =await getEvents()

  return events.map((item) => 
  ({ slug: item.slug  })
  )
}
  
export default async function TicketDetail({params} : {params: {slug: string}}){
  const event : {events: IEvents[]} = await getEventSlug(params.slug)
  const data : {events: IEvents[]} = await getEvents()
  
  return (
    <div className="grid grid-cols-2 absolute z-30 left-20 w-[90vw] h-full bg-white rounded-xl py-7 px-10">
              {data.events.map((item) => {
                return (
                  <div className="flex flex-col gap-5">
                  <h1 className="text-4xl font-semibold">{}</h1>
                <Image
                src="/logo.png"
                alt=""
                width={1000}
                height={800}
                className="bg-black rounded-xl p-2"/>
                
                <Description/>
                </div>
              )
              })}
        <div>
          organizer profile 
        </div>
    </div>
  )
}