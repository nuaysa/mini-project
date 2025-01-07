const formatDatetimeForDB  = (date: string): string => {
  const datetime = new Date(date);

  const year = datetime.getUTCFullYear();
  const month = String(datetime.getUTCMonth() + 1).padStart(2, "0"); 
  const day = String(datetime.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
