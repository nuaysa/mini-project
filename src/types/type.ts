export interface IUser {
    username: string;
    email: string;
    avatar: string;
}

export interface IEvents{
    id: number;
    title: string;
    description: string;
    category: "Entertainment" | "seminar" | "sport" | "food" | "all";
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
    ticket: ITicket[]
}

export interface IPromotor{
    id: number;
    name: string;
    email: string;
    avatar: string;
}

export interface ITicket {
        id: number,
        eventId: number,
        price: number,
        category: "VIP"| "Cat1" | "Cat2" | "festivalPass" | "free",
        startDate: Date,
        endDate: Date,
        isActive: Boolean,
        discount: Boolean,
        quota: number,
   }

   
export interface EventInput {
    title: string;
    description: string;
    slug: string;
    category: "Entertainment" | "seminar" | "sport" | "food" | "all";
    date: Date;
    time: string;
    location: "Bandung" | "Jakarta" | "Bogor" | "Depok" |"Tangerang" | "Bekasi";
    venue: string;
    mapURL: string;
    type: "Paid" | "Free";
    thumbnail: File | string | null;
  }

  export interface TicketInput {
    price: number;
    category: "VIP"| "Cat1" | "Cat2" | "festivalPass" | "free" ;
    startDate: Date;
    endDate: Date;
    quota: number;
    discount: Boolean;
  }