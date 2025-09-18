const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => onPageChange(page);
  const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {[1, 2, 3, "...", totalPages].map((page, idx) =>
        page === "..." ? (
          <span key={idx}>...</span>
        ) : (
          <button
            key={idx}
            onClick={() => handlePageClick(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        )
      )}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
