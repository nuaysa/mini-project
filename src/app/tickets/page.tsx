import RatingForm from "@/components/ratingForm";
import TicketDetail from "@/components/ticketDetails";

export default function Tickets() {
    return (
        <div className="flex flex-col justify-center">
            <TicketDetail/>
            <div className="relative h-[40vh] bg-[#387478]/80 max-w-screen"></div>
            <div className="relative h-screen bg-neutral-200 max-w-screen"></div>
            <div>
                <RatingForm/>
            </div>
        </div>
    )
}