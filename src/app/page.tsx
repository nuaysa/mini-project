
"use client";
import Card from "@/components/card";
import Carousel from "@/components/carousell";
import CreateNew from "@/components/ClickNewEvent";
import Searchbar from "@/components/searchBar";
import { IEvents } from "@/types/type";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<IEvents[]>([]);
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("keyword") || "");
  const [loading, setLoading] = useState(false);
 
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://ate-backend.vercel.app/api/events?isActive=true`);
      const result = await res.json();
      setEvents(result.events);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  })


  return (
    <div>
      <div className=" h-full static flex flex-col">
        <Carousel />
        <Searchbar value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="sm:hiden flex">
          {/* <Sidebar /> */}
          <div className="flex flex-col my-10 bg-neutral-200 mx-10 w-full p-8 rounded-xl">
            {events.length == 0 ?
            <div>
              <h1 className="text-3xl text-center font-semibold text-[#387874]">No Events Found</h1>
            </div>  : 
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:grid-rows-3 md:grid-rows-2 ml-12 gap-5 justify-start">
                {events.map((item, idx) => {
                  return (
                  <Card
                    key={idx}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    logo={item.Promotor.avatar}
                    price={item.ticket[0].price}
                    slug={item.slug}
                    category={item.category}
                    location={item.location}
                    time={item.date}
                    organizer={item.Promotor.name}
                    />
                  );
                })}
            </div>
              }
            <Link href="/list" className="text-[#387478] my-3">
              see more events
            </Link>
            <div>
              <CreateNew />
            </div>
          </div>
        </div>
      </div>
    </div>
            )
          }
