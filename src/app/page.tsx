import Ticket from "@/components/ticket";
import Carousel from "@/components/carousell";
import Searchbar from "@/components/searchBar";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className=" h-full static flex flex-col">
      <Carousel/>
      <Searchbar/>
      <Ticket/>
      <div>

      </div>
    </div>
  );
}
