import Description from "@/components/tickets";
import { formatDate } from "@/helpers/dateFormat";
import { formatPrice } from "@/helpers/priceFormat";
import formatToWIB from "@/helpers/timeFormat";
import { getEvents, getEventSlug } from "@/libs/events";
import { IEvents } from "@/types/type";
import Image from "next/image";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
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
      <div className="relative min-h-[80vh] py-20 bg-[#387478]/80 max-w-screen"></div>
      <div className="relative min-h-[180vh] py-20 bg-neutral-200 min-w-screen"></div>
      {data.map((item, idx: any) => {
        return (
          <div className="flex absolute z-30 left-20 my-40 w-[90vw] h-max bg-white rounded-xl py-7 px-10">
            <div key={idx} className="flex flex-col gap-5 w-2/3">
              <h1 className="text-3xl font-semibold text-neutral-700">{item.title}</h1>
              <Image src={item.thumbnail} alt={item.title} width={800} height={800} className="rounded-xl p-2" />
              <div className="px-8 py-5 leading-8">
              <h1 className="text-[#387874] font-semibold text-2xl leading-8">Description : </h1>
              <div className="my-3 mx-2">{item.description}</div>
                
                <h1 className="text-[#387874] font-semibold text-2xl mb-8">Ticket : </h1>
                {item.ticket.map((ticket, ticketIdx) => (
                  <Description key={ticketIdx} slug={item.slug} price={ticket.price == 0 ? "Free" : formatPrice(ticket.price)} category={ticket.category} quota={ticket.quota} />
                ))}
              </div>
            </div>

            <div className="bg-neutral-200 h-[300px] w-1/2 rounded-xl flex flex-col justify-between mt-16 ml-7 p-10 ">
              <div className="flex gap-5 mb-3">
                <Image src={item.Promotor.avatar} alt="Organizer" width={60} height={60} className="rounded-full" />
                <div className="flex flex-col">
                  <h3 className="text-md text-neutral-700">Event Organizer</h3>
                  <h1 className="text-2xl font-bold">{item.Promotor.name}</h1>
                </div>
              </div>
              <div >
              <hr className="border border-white" />
              <br />
              <h5 className="flex gap-2 items-center mb-2 text-xl font-bold text-[#387478]">
                <FaLocationDot /> {item.location}, {item.venue}
              </h5>
              <h5 className="flex gap-2 items-center mb-2 text-xl font-bold text-[#387478]">
                <FaCalendarAlt /> {formatDate(item.date.toString())}
              </h5>
              <h5 className="flex gap-2 items-center mb-2 text-xl font-bold text-[#387478]">
                <FaRegClock /> {formatToWIB(item.time)}
              </h5>
              </div>
              <h1 className="text-[#387874] font-semibold text-2xl mt-20">Location : </h1>
                <div className="bg-neutral-400 rounded-xl my-5">
                  <iframe src={item.mapURl} width={500} height={450} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
