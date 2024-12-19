import Image from "next/image";

export default function Loading() {
    return (
        <div className="bg-neutral-100 flex flex-col gap-4 justify-center items-center py-40 ">
            <Image
            src = "/ATE-logo.png"
            alt="loading.."
            width={400}
            height={400}
            className="animate-bounce"/>
            <h1 className="text-[#387874] text-2xl">Loading, please wait...</h1>
         </div>
    )
}