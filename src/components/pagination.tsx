
"use client";

import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

export function CompPagination() {
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPage, setTotalPage] = useState(1)
    useEffect(() => {
        const fetchTotalPages = async () => {
          try {
            const response = await fetch('http://localhost:8000/api/events');
            const data = await response.json();
            const totalEvents = data.events.length; 
            console.log(totalEvents)
            const eventsPerPage = 12;
            setTotalPage(Math.ceil(totalEvents / eventsPerPage));
          } catch (error) {
            console.error('Error fetching total pages:', error);
          }
        };
    
        fetchTotalPages();
      }, []);
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="navigation"
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
