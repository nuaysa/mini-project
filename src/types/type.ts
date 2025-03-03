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
    maps: string;
    date: Date;
    time: Date;
    type: "Paid" | "Free";
    thumbnail: string;
    isActive: boolean;
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
        isActive: boolean,
        discount: boolean,
        quota: number,
   }

   
export interface EventInput {
    title: string;
    description: string;
    slug: string;
    category: string;
    date: string;
    time: string;
    location: string;
    venue: string;
    maps: string;
    type: string;
    thumbnail?: File | string | null
  }

  export interface TicketInput {
    price: number;
    category: string ;
    startDate: string;
    endDate: string;
    quota: number;
    discount: boolean;
  }

  export interface ITransaction {
    id: number,
    basePrice: number,
    totalPrice: number,
    finalPrice: number,
    status: string,
    user: IUser,
    ticket: ITicket,
    createdAt: Date,
    expiresAt: Date,
    qty: number,
    promoQuota: number,
    redirect_url: string,
    userVoucher: number,
    userPoints: number,
    discount: number,
}

export interface ReviewInput{
    desc: string;
    rating: string;
}
