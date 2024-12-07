import Link from "next/link";
import Sidebar from "./sidebar";
import CreateNew from "./ClickNewEvent";
import Card from "./card";

export default function HomeDis() {
  return (
    <div className="sm:hiden max-sm:flex">
    <Sidebar/>
    <div className="flex flex-col my-10 bg-neutral-100 mx-10 w-full rounded-xl p-10">
      <div className="grid grid-cols-3 grid-rows-3">
    <Card />
    </div>
    <Link href="/events" className="text-[#387478] my-3">see more events</Link>
    <div>
      <CreateNew/>
    </div>
    </div>
    </div>
  );
}