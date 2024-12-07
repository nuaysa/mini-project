import Card from "@/components/card";
import CreateNew from "@/components/ClickNewEvent";
import Searchbar from "@/components/searchBar";
import Sidebar from "@/components/sidebar";

export default function Events() {
    return (
        <div>
            <Searchbar/>
            <div className="lg:flex">
            <Sidebar/>
            <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full rounded-xl p-10">
            <Card />
            <CreateNew/>
        </div>
            </div>
        </div>
    )}