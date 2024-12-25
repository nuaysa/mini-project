export default function formatToWIB(dateString: Date) {
    const date: Date = new Date(dateString);
  
    const options: {} = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
      timeZoneName: "short",
    };
  
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }
  
