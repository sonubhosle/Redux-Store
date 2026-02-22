import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  showFirstLast = true,
  showPageNumbers = true,
  size = "md" // sm, md, lg
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Size classes
  const sizeClasses = {
    sm: {
      button: "w-8 h-8 text-xs",
      icon: "w-4 h-4"
    },
    md: {
      button: "w-10 h-10 text-sm",
      icon: "w-5 h-5"
    },
    lg: {
      button: "w-12 h-12 text-base",
      icon: "w-6 h-6"
    }
  };

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 mt-8" aria-label="Pagination">
      {/* First page button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`
            ${sizeClasses[size].button} rounded-xl border-2 border-stone-200 
            bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed 
            transition-all duration-200 hover:border-amber-500 disabled:hover:border-stone-200
            flex items-center justify-center font-semibold text-stone-700
          `}
          aria-label="Go to first page"
        >
          <ChevronsLeft className={sizeClasses[size].icon} />
        </button>
      )}

      {/* Previous page button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          ${sizeClasses[size].button} rounded-xl border-2 border-stone-200 
          bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed 
          transition-all duration-200 hover:border-amber-500 disabled:hover:border-stone-200
          flex items-center justify-center font-semibold text-stone-700
        `}
        aria-label="Go to previous page"
      >
        <ChevronLeft className={sizeClasses[size].icon} />
      </button>

      {/* Page numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Left ellipsis */}
          {pageNumbers[0] > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`
                  ${sizeClasses[size].button} rounded-xl border-2 border-stone-200 
                  bg-white hover:bg-stone-50 transition-all duration-200 
                  hover:border-amber-500 font-semibold text-stone-700
                  flex items-center justify-center
                `}
              >
                1
              </button>
              {pageNumbers[0] > 2 && (
                <span className="px-2 text-stone-400 font-bold">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`
                ${sizeClasses[size].button} rounded-xl border-2 font-semibold 
                transition-all duration-200 flex items-center justify-center
                ${
                  currentPage === num
                    ? "bg-linear-to-r from-amber-500 to-amber-600 border-amber-600 text-white shadow-lg shadow-amber-500/30 scale-110"
                    : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:border-amber-500 hover:scale-105"
                }
              `}
              aria-current={currentPage === num ? "page" : undefined}
            >
              {num}
            </button>
          ))}

          {/* Right ellipsis */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-2 text-stone-400 font-bold">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`
                  ${sizeClasses[size].button} rounded-xl border-2 border-stone-200 
                  bg-white hover:bg-stone-50 transition-all duration-200 
                  hover:border-amber-500 font-semibold text-stone-700
                  flex items-center justify-center
                `}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          ${sizeClasses[size].button} rounded-xl border-2 border-stone-200 
          bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed 
          transition-all duration-200 hover:border-amber-500 disabled:hover:border-stone-200
          flex items-center justify-center font-semibold text-stone-700
        `}
        aria-label="Go to next page"
      >
        <ChevronRight className={sizeClasses[size].icon} />
      </button>

      {/* Last page button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
            ${sizeClasses[size].button} rounded-xl border-2 border-stone-200 
            bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed 
            transition-all duration-200 hover:border-amber-500 disabled:hover:border-stone-200
            flex items-center justify-center font-semibold text-stone-700
          `}
          aria-label="Go to last page"
        >
          <ChevronsRight className={sizeClasses[size].icon} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;