const formatDatetimeForDB = (date: string, time:string) => {
    const datePart = new Date(date).toISOString().split("T")[0]; // Format 'YYYY-MM-DD'
    const timePart = time.includes(":") ? time : "00:00:00"; // Tambahkan waktu default jika kosong
    return `${datePart} ${timePart}`;
  };