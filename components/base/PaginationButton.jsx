/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, basic = false }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is defined (i.e., we are in the browser)
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768);

            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const pageNumbers = [];

    if (basic) {
        pageNumbers.push(currentPage);
    } else {
        if (isMobile) {
            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                if (currentPage <= 3) {
                    pageNumbers.push(1, 2, 3, 4, 5);
                } else if (currentPage >= totalPages - 2) {
                    pageNumbers.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                } else {
                    pageNumbers.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
                }
            }
        } else {
            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                if (currentPage <= 5) {
                    pageNumbers.push(1, 2, 3, 4, 5, 6, 7, '...', totalPages);
                } else if (currentPage >= totalPages - 2) {
                    pageNumbers.push(1, '...', totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                } else {
                    pageNumbers.push(1, '...', currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, '...', totalPages);
                }
            }
        }
    }

    return (
        <div className="mt-12 max-w-[1140px] mx-auto flex space-x-[14px] items-center justify-center">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                className={`w-[58px] h-[58px] ${currentPage === 1 ? 'text-black bg-white' : 'text-white bg-yellow-400'} border border-grey-400 border-opacity-30 rounded flex items-center justify-center text-lg font-bold`}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {pageNumbers.map((number, index) => (
                <button
                    key={index}
                    onClick={() => number !== '...' && onPageChange(number)}
                    className={`w-[58px] h-[58px] ${currentPage === number ? 'text-white bg-yellow-400' : 'text-gray-400 bg-white'} border border-grey-400 rounded flex items-center justify-center text-lg font-bold`}
                    disabled={number === '...'}
                >
                    {number}
                </button>
            ))}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                className={`w-[58px] h-[58px] ${currentPage === totalPages ? 'text-black bg-white' : 'text-white bg-yellow-400'} border border-grey-400 border-opacity-30 rounded flex items-center justify-center text-lg font-bold`}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
