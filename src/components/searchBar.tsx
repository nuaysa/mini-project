
"use client"

import { useRouter, useSearchParams } from "next/navigation";

interface searchbarProps{
    value: string
    onChange: (e: any) => void
}

export default function Searchbar({value, onChange,}: searchbarProps) {   
    const router = useRouter()
    const searchParams = useSearchParams();
    const handleSearch = () => {
        router.push(`/list?keyword=${value}`);
      };
    return (
        <div className="searchbar flex justify-center py-2 px-10 bg-[#387478] sticky top-0 z-50">
            <input 
            type="search"
            value={value}
            onChange={onChange} 
            placeholder="Search by title..." 
            className="border rounded-l-xl p-2 border-neutral-50 w-96"/>
          <button
            onClick={handleSearch}
            className="bg-[#387478] hover:bg-[#387874]/60 text-white rounded-r-xl border border-neutral-50 p-2 w-28">Search</button>
        </div>
    )
}