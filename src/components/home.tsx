// import Link from "next/link";
// import Sidebar from "./sidebar";
// import CreateNew from "./ClickNewEvent";
// import Card from "./card";
// import { IEvents } from "@/types/type";
// import { getEvents } from "@/libs/events";

// export default async function HomeDis() {
//   const data:{events: IEvents[]} = await getEvents();
//   console.log(data.events)
//   return (
//     <div className="sm:hiden flex">
//       <Sidebar />
//       <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full rounded-xl p-10">
//         <div className="grid grid-cols-3">
//      {data.events.map((item) => {
//           return (
//               <Card 
//               title={item.title} 
//               thumbnail={item.thumbnail} 
//               logo={item.Promotor.avatar} 
//               price={item.Ticket?.price} 
//               slug={item.slug} 
//               category={item.category} 
//               location={item.location} 
//               time={item.time} 
//               organizer={item.Promotor.name} />
//             );
//           })}
//           </div>
//         <Link href="/events" className="text-[#387478] my-3">
//           see more events
//         </Link>
//         <div>
//           <CreateNew />
//         </div>
//       </div>
//     </div>
//   );
// }
