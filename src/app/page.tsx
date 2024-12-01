// import Ticket from "@/components/home";
import Carousel from "@/components/carousell";
import Searchbar from "@/components/searchBar";
import Events from "@/components/tickets";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-full static flex flex-col">
      <Carousel/>
      <Searchbar/>
      <Home/>
    </div>
  );
}
