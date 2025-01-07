import Link from "next/link";

export default function PaymentSuccess(){
    return(
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-[#387874]">Payment Success !</h1>
            <br />
            <Link href="/" className="text-white bg-[#387874] py-4 px-6 rounded-xl hover:bg-[#387874]/60"> Back To Home </Link>
        </div>
    )
}