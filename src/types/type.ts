export interface IUser {
    username: string;
    email: string;
    avatar: string;
}

export interface IEvents{
    id: number;
    title: string;
    description: string;
    category: "Entertaiment" | "seminar" | "business" | "food";
    location: "Bandung" | "Jakarta" | "Bogor" | "Depok" |"Tangerang" | "Bekasi";
    venue: string;
    mapURl: string;
    date: Date;
    time: Date;
    type: "Paid" | "Free";
    thumbnail: string;
    isActive: Boolean;
    slug: string;
    Promotor: IPromotor;
    Ticket: ITicket
    
}

export interface IPromotor{
    id: number;
    name: string;
    email: string;
    avatar: string;
}

export interface ITicket {
    id: number;
    eventId: number;
    price: number;
    category: ""| "";
    startDate: Date;
    endDate: Date;
    isActive: Boolean;
    discount: Boolean;
    quota: number;
}