export default function Searchbar() {
    return (
        <div className="searchbar flex justify-center py-2 px-10 bg-[#387478]">
            <input type="text" placeholder="Search..." className="border rounded-l-xl p-2 border-neutral-900 w-96"/>
            <button className="bg-[#387478] text-white rounded-r-xl border border-neutral-900 p-2 w-28">Search</button>
        </div>
    )
}