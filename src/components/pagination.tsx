import React from 'react'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => { const pages = Array.from({ length: totalPages}, (_, i) => i++ ) 

return (
    <div>
        {pages.map((page) => (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage == page ? 'active' : 'not-active'}
            >
                {page}
            </button>
        ))}
    </div>
)
}

export default Pagination