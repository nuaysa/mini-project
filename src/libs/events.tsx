export const getEvents = async () => {
  const res = await fetch(`http://localhost:8000/api/events`, 
  { next: { revalidate: 0 } });
  const data = await res.json();
  console.log(data);
  return data.events;
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`http://localhost:8000/api/events/${slug}`, 
  { next: { revalidate: 0 } });
  const data = await res.json();
  return data.event;
};

export const getTicketId = async (id:number) => {
  const res = await fetch(`http://localhost:8000/api/events/ticket/${id}`, 
  { next: { revalidate: 0 } });
  const data = await res.json();
  return data.ticket;
};
