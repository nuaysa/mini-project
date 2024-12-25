"use client";
import Card from "@/components/card";
import Sidebar from "@/components/sidebar";
import { IEvents } from "@/types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Loading from "../loading";
import Pagination from "@/components/pagination";
import Searchbar from "@/components/searchBar";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { PiBowlFoodBold, PiProjectorScreenBold } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import CreateNew from "@/components/ClickNewEvent";

const categories = [ 
  { id: 1, name: 'sport', icon: <MdOutlineSportsBasketball className="text-3xl" /> },
  { id: 2, name: 'seminar', icon: <PiProjectorScreenBold className="text-3xl" /> },
  { id: 3, name: 'entertainment', icon: <TbMovie className="text-3xl" /> },
  { id: 4, name: 'food', icon: <PiBowlFoodBold className="text-3xl" /> },
]

const base_url = process.env.BASE_URL_BE;
export default function List() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1)
  const [events, setEvents] = useState<IEvents[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("keyword") || "");
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleCategorySelect = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
    setSelectedCategory(categoryName);
    getData(categoryName)
  };

  const getData = async (category: string) => {
    try {
      setIsloading(true);
      console.log("Fetching data for category:", category);
      const res = await fetch(`https://ate-backend.vercel.app/api/events?search=${text}&page=${currentPage}&category=${category}`);
      const result = await res.json();
      setTotalPages(Math.ceil(result.total / itemsPerPage)); 
      console.log(result.events)
      setEvents(result.events);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams, currentPage, selectedCategory],
  );

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("keyword", text));
    getData(selectedCategory);
  }, [text]);


  return (
    <div>
      <Searchbar 
      value = {value}
      onChange= {(e) => setValue(e.target.value)}
      />
      <div className="hidden lg:flex">
        <Sidebar 
        categories ={categories} 
        onCategorySelect={handleCategorySelect}
        />
        <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full rounded-xl p-10">
          {isLoading ? (
            <Loading />
          ) : events.length == 0 ? (
            <div className="flex justify-center text-[#387478]">events not found, try another keyword</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {events.map((item, idx) => {
                return (
                  <div key={idx}>
                    <Card
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
                  </div>
                );
              })}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
          <CreateNew/>
        </div>
      </div>
    </div>
  );
}
