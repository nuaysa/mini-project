import Card from "@/components/card";
import CreateNew from "@/components/ClickNewEvent";
import Searchbar from "@/components/searchBar";
import Sidebar from "@/components/sidebar";
import { getEvents } from "@/libs/events";
import { IEvents } from "@/types/type";

export default async function Events() {
    const data:{events: IEvents[]} = await getEvents();
    return (
        <div>
            <Searchbar/>
            <div className="lg:flex">
            <Sidebar/>
                    <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full rounded-xl p-10">
                        <div className="grid grid-cols-3">
            {data.events.map((item, idx) => {
                return(
                    <Card 
                    key={idx}
                       title={item.title} 
                       thumbnail={item.thumbnail} 
                       logo={item.promotor?.avatar} 
                       price={item.ticket?.price} 
                       slug={item.slug} 
                       category={item.category} 
                       location={item.location} 
                       time={item.time} 
                       organizer={item.promotor?.name} />
                    )})}
                    </div>
            <CreateNew/>
        </div>
            </div>
        </div>
    )}