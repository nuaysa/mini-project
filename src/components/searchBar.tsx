"use client"

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { useDebounce } from 'use-debounce';

export default function Searchbar() {   
    // const router = useRouter();
    // const searchParams = useSearchParams()
    // const pathname = usePathname()
    // const [tickets, setTickets] = useState<ITicket[]>([]);
    // const [value, setValue] = useState<string>(searchParams.get("keyword") || (""));
    // // const [text] = useDebounce(value, 500);
    // const [isLoading, setIsLoading] = useState<Boolean>(false);
    // const getData = async() => {
    //     try{
    //         setIsLoading(true)
    //         const res = await fetch(`backend/tickets?search=${value}`)
    //         const result = await res.json()
    //         setTickets(result)
    //     }catch(err) {
    //         console.log(err)
    //     }finally{
    //         setIsLoading(false)
    //     }
    // }

    // const createQueryString = useCallback(
    //     (name: string, value: string) => {
    //         const params = new URLSearchParams(searchParams.toString())
    //         params.set(name, value)
       
    //         return params.toString()
    //       },
    //       [searchParams]
    //     )   

    // // useEffect(() => {
    // //     getData()
    // // },[text])

    return (
        <div className="searchbar flex justify-center py-2 px-10 bg-[#387478] sticky top-0 z-50">
            <input 
            type="search"
            // value= {text}
            // onChange={(e) => setValue(e.target.value)} 
            placeholder="Search by title..." 
            className="border rounded-l-xl p-2 border-neutral-50 w-96"/>
            <button
            // onClick={() => {
            //     // <pathname>?sort=asc
            //     router.push(pathname + '?' + createQueryString('sort', 'asc'))
            //   }}
            className="bg-[#387478] text-white rounded-r-xl border border-neutral-50 p-2 w-28">Search</button>
        </div>
    )
}