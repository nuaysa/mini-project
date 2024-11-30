import Card from "@/components/cards";
import Carousel from "@/components/carousell";
import Searchbar from "@/components/searchBar";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="bg-neutral-100 h-screen relative flex flex-col">
      {/* <Carousel/> */}
      <Searchbar/>
      <Sidebar/>
      <Card/>
    </div>
  );
}
