const formatDateForInput = (dateString) => {
  const date = new Date(dateString);

  // Pastikan tanggal valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Format menjadi yyyy-MM-dd
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

