import Description from "@/components/tickets";
import { formatDate } from "@/helpers/dateFormat";
import { formatPrice } from "@/helpers/priceFormat";
import { getEvents, getEventSlug } from "@/libs/events";
import { IEvents } from "@/types/type";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const generateStaticParams = async () => {
  const events: IEvents[] = await getEvents();

  return events.map((item) => ({ slug: item.slug }));
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event: IEvents = await getEventSlug(params.slug);
  return {
    title: event.title,
    description: event.title,
    openGraph: {
      images: [`https:${event.thumbnail}`],
    },
  };
}

export default async function Tickets({ params }: { params: { slug: string } }) {
  const event: IEvents = await getEventSlug(params.slug);
  const data: IEvents[] = await getEvents();
  return (
    <div className="flex flex-col justify-center">
      <div className="relative min-h-[70vh] py-20 bg-[#387478]/80 max-w-screen"></div>
      <div className="relative min-h-[170vh] py-20 bg-neutral-200 min-w-screen"></div>
      {data.map((item, idx: any) => {
        return (
          <div className="flex absolute z-30 left-20 my-40 w-[90vw] h-max bg-white rounded-xl py-7 px-10">
            <div key={idx} className="flex flex-col gap-5 w-2/3">
              <h1 className="text-3xl font-semibold text-neutral-700">{item.title}</h1>
              <Image src={item.thumbnail} alt={item.title} width={800} height={800} className="rounded-xl p-2" />
              <div className="px-8 py-5 leading-8" >
              <h1 className="text-[#387874] font-semibold text-xl">Location : </h1>
      <div className="bg-neutral-400 rounded-xl mx-10 my-5">
        <iframe
        src={item.mapURl}
        />
      </div>
      <h1 className="text-[#387874] font-semibold text-xl">Ticket : </h1>
              {item.ticket.map((ticket, ticketIdx) => (
          <Description
            key={ticketIdx} 
            slug={item.slug}
            price={ticket.price == 0 ? "Free" : formatPrice(ticket.price)}
            category={ticket.category}
            quota={ticket.quota}
          />
        ))}
                </div>
            </div>

            <div className="bg-neutral-300 h-[500px] w-1/2 rounded-xl flex flex-col ml-7 p-10 ">
                        <h5 className="flex gap-2 items-center mb-2 text-xl font-bold  line-clamp-2 tracking-tight text-[#387478]">
                        <FaLocationDot /> {item.location}, {item.venue}
                        </h5>
                        <h5 className="flex gap-2 items-center mb-2 text-xl font-bold  line-clamp-2 tracking-tight text-[#387478]">
                        <FaCalendarAlt />  {formatDate(item.time.toString())} 
                        </h5>
                <div>
                    
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
