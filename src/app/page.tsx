import Carousel from "@/components/carousell";
import Searchbar from "@/components/searchBar";
import HomeDis from "@/components/home";

export default function Home() {
  return (
    <div className=" h-full static flex flex-col">
      <Carousel/>
      <Searchbar/>
      <HomeDis/>
</div>
  );
}
