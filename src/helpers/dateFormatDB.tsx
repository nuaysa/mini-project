
const formatDatetimeForDB = (date: string, time:string) => {
    const datePart = new Date(date).toISOString(); // Format 'YYYY-MM-DD'
    const timePart = time.includes(":") ? time : "00:00:00"; // Tambahkan waktu default jika kosong
    return `${datePart} ${timePart}`;
  };
<<<<<<< HEAD
  export default formatDatetimeForDB
=======

>>>>>>> 8ea066e9f629006e55a134735e7a675213b27f37
