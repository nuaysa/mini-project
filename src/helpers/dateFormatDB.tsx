const formatDatetimeForDB = (date: string, time: string): string => {
  const datetime = new Date(`${date}T${time}Z`);

  const year = datetime.getUTCFullYear();
  const month = String(datetime.getUTCMonth() + 1).padStart(2, "0"); 
  const day = String(datetime.getUTCDate()).padStart(2, "0");
  const hours = String(datetime.getUTCHours()).padStart(2, "0");
  const minutes = String(datetime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(datetime.getUTCSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

  return formattedDate;
};
