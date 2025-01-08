export const getEvents = async () => {
  const res = await fetch(`https://ate-backend.vercel.app/api/events`, 
  { next: { revalidate: 0 } });
  const data = await res.json();
  return data.events;
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`https://ate-backend.vercel.app/api/events/${slug}`,
  { next: { revalidate: 0 } });
  const data = await res.json();
  return data.event;
};

export const getTicketId = async (id:number) => {
  const res = await fetch(`https://ate-backend.vercel.app/api/events/ticket/${id}`, 
  { next: { revalidate: 0 } });
  const data = await res.json();
  return data.ticket;
};

// export const getDetail = async () => {
//   const res = await fetch(`https://ate-backend.vercel.app/api/transaction/detail/`, 
//   { next: { revalidate: 0 } });
//   const data = await res.json();
//   return data.detail;
// };

