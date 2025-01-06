import Review from "@/components/reviewCol";
import Description from "@/components/tickets";
import { formatDate } from "@/helpers/dateFormat";
import { formatPrice } from "@/helpers/priceFormat";
import formatToWIB from "@/helpers/timeFormat";
import { getDetail, getEvents, getEventSlug } from "@/libs/events";
import { IEvents } from "@/types/type";
import Image from "next/image";
import { userAgent } from "next/server";
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
  const detail = await getDetail()
  
  return (
    <div className="flex flex-col justify-center">
      <div className="relative lg:min-h-[90vh] lg:max-h-[100vh] min-h-[90vh] py-20 bg-[#387478]/80 max-w-screen"></div>
      <div className="relative lg:min-h-[160vh] min-h-[100vh] py-20 bg-neutral-200 min-w-screen"></div>
          <div className="flex absolute z-30 mx-10 lg:mx-0 lg:left-20 mb-36 w-[80vw] lg:w-[90vw] my-32 h-max bg-white rounded-xl py-7 px-5 lg:px-10">
            <div className="flex flex-col gap-5 w-2/3">
              <h1 className="text-3xl font-semibold text-neutral-700">{event.title}</h1>
              <Image src={event.thumbnail} alt={event.title} width={800} height={800} className="rounded-xl p-2" />
              <div className="flex gap-5 mb-3 lg:hidden">
                <Image src={event.Promotor.avatar} alt="Organizer" width={30} height={30} className="rounded-full" />
                <div className="flex flex-col">
                  <h3 className="text-md text-neutral-700">Event Organizer</h3>
                  <h1 className="text-lg lg:text-2xl font-bold">{event.Promotor.name}</h1>
                  <div className="lg:hidden">
              <hr className="border border-white" />
              <br />
              <h5 className="flex gap-2 items-center mb-2 text-md lg:text-xl font-bold text-[#387478]">
                <FaLocationDot /> {event.location}, {event.venue}
              </h5>
              <h5 className="flex gap-2 items-center mb-2 text-md lg:text-xl font-bold text-[#387478]">
                <FaCalendarAlt /> {formatDate(event.date.toString())}
              </h5>
              <h5 className="flex gap-2 items-center mb-2 text-md lg:text-xl font-bold text-[#387478]">
                <FaRegClock /> {formatToWIB(event.time)}
              </h5>
              </div>
                </div>
              </div>
              <div className="px-8 py-5 leading-8">
              <h1 className="text-[#387874] font-semibold text-2xl leading-8 hidden lg:flex">Description : </h1>
              <div className="my-3 mx-2 sm:hidden lg:flex">{event.description}</div>
                
                <h1 className="text-[#387874] font-semibold text-2xl mb-8">Ticket : </h1>
                {
                new Date(event.date).getTime() > new Date().getTime() ? (
                  event.ticket.map((ticket, ticketIdx) => (
                  <Description key={ticketIdx} slug={event.slug} price={ticket.price == 0 ? "Free" : formatPrice(ticket.price)} category={ticket.category} quota={ticket.quota} id={ticket.id} />
                 ))) :  (<div className="text-red-500 text-2xl">No Ticket Available</div>)
                }
              
                  </div>
            </div>

            <div className="bg-neutral-200 h-[300px] w-1/2 rounded-xl  justify-between mt-16 ml-7 p-10 hidden lg:flex lg:flex-col">
              <div className="flex gap-5 mb-3 sm:hidden lg:flex">
                <Image src={event.Promotor.avatar} alt="Organizer" width={60} height={60} className="rounded-full" />
                <div className="flex flex-col">
                  <h3 className="text-md text-neutral-700">Event Organizer</h3>
                  <h1 className="text-2xl font-bold">{event.Promotor.name}</h1>
                </div>
              </div>
              <div className="hidden lg:flex items-end">
              <hr className="border border-white" />
              <br />
              <div className="flex flex-col">

              <h5 className="flex gap-2 items-center mb-2 text-xl font-bold text-[#387478]">
                <FaLocationDot /> {event.location}, {event.venue}
              </h5>
              <h5 className="flex gap-2 items-center mb-2 text-xl font-bold text-[#387478]">
                <FaCalendarAlt /> {formatDate(event.date.toString())}
              </h5>
              <h5 className="flex gap-2 items-center mb-2 text-xl font-bold text-[#387478]">
                <FaRegClock /> {formatToWIB(event.time)}
              </h5>
              </div>
              </div>
              <h1 className="text-[#387874] font-semibold text-2xl mt-24 sm:hidden lg:flex">Location : </h1>
                <div className="bg-neutral-400 rounded-xl my-5 sm:hidden lg:flex">
                  <iframe src={event.maps} width={500} height={450} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="overflow-hidden"/>

                </div>
            </div>
          </div>

          <div className={`flex flex-col gap-5 w-2/3 ${new Date(event.date).getTime() > new Date().getTime () || !detail ? "hidden" : "flex"}`}>
    <Review EventId={event.id}/>
          </div>
    </div>
  );
}
