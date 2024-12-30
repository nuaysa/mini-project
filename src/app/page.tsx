"use client";
import Card from "@/components/card";
import Carousel from "@/components/carousell";
import CreateNew from "@/components/ClickNewEvent";
import Searchbar from "@/components/searchBar";
import { IEvents } from "@/types/type";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [events, setEvents] = useState<IEvents[]>([]);
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("keyword") || "");
 
  const getData = async () => {
    try {
      const res = await fetch(`https://ate-backend.vercel.app/api/events`);
      const result = await res.json();
      setEvents(result.events);
    } catch (err) {
      console.log(err);
    } 
  };
  useEffect(() => {
    getData();
  })


  return (
    <div>
      <div className=" h-full static flex flex-col">
        <Carousel />
        <Searchbar value={value} onChange={(e) => setValue(e.target.value)}/>
        <div className="sm:hiden flex">
          {/* <Sidebar /> */}
          <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 px-5">
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
  );
}
