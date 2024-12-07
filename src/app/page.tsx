
// import Ticket from "@/components/ticket";
import Carousel from "@/components/carousell";
import Searchbar from "@/components/searchBar";
import HomeDis from "@/components/home";
import Card from "@/components/card";

export default function Home() {
  return (
    <div>
    <div className=" h-full static flex flex-col">
      <Carousel/>
      <Searchbar/>
      <HomeDis/>
</div>
      {/* <Card/> */}
      <div>

      </div>
    </div>
);
}
