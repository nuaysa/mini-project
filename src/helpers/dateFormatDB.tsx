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

// Contoh penggunaan
try {
  const formattedDate = formatDateForInput("Tue Jan 07 2025 10:04:10 GMT+0700");
  console.log(formattedDate); // Output: 2025-01-07
} catch (error) {
  console.error(error.message);
}
