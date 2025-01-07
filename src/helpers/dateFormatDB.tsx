export const formatDatetimeForDB = (date: string, time: string): string => {
  const dateObj = new Date(date);

  // Validasi apakah tanggal valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }

  // Format tanggal menjadi 'YYYY-MM-DD'
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Validasi waktu atau gunakan default '00:00:00'
  const formattedTime = time.includes(":") ? time : "00:00:00";

  // Gabungkan tanggal dan waktu dalam format standar ISO (tanpa 'T' atau 'Z')
  return `${formattedDate}T${formattedTime}`;
};

