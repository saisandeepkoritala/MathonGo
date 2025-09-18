import { useState, useEffect, useRef } from "react";
import TableBodyRows from "./TableBodyRows";
import renderMyRow from "./MyRow";
import Pagination from "./Pagination";

const TableBody = ({ others, myRank }) => {
  const rowsPerPage = 10;
  const tableRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [atBottom, setAtBottom] = useState(false);

  const myItem = others.find((item) => item.rank === myRank);
  const totalPages = Math.ceil(others.length / rowsPerPage);

  // Find my page based on rank
  const myIndex = others.findIndex((item) => item.rank === myRank);
  const myPage = Math.floor(myIndex / rowsPerPage) + 1;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = others.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (page) => setCurrentPage(page);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Track if user scrolled to bottom
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handleScroll = () => {
      const isBottom = table.scrollTop + table.clientHeight >= table.scrollHeight - 5;
        setAtBottom(isBottom);
    };

    table.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => table.removeEventListener("scroll", handleScroll);
  }, []);


  // My row visible on current page?
  const myVisibleOnPage = currentRows.some((r) => r.rank === myRank);

  // Should we render sticky at all?
  const shouldRenderSticky = myItem && currentPage !== myPage;

  return (
    <div style={{ position: "relative" }}>
      {/* Table wrapper */}
      <div ref={tableRef} style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Overall Score</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Maths</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <TableBodyRows currentRows={currentRows} />
        </table>

        {/* Sticky row inside scroll area */}
          {shouldRenderSticky && !atBottom && !myVisibleOnPage && (
            <div className="sticky-row">
              <table className="leaderboard-table">
                <tbody>{renderMyRow(myItem)}</tbody>
              </table>
            </div>
          )}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
      />

      {/* Row below pagination when at bottom */}
      {shouldRenderSticky && atBottom && !myVisibleOnPage && (
        <div className="row-below-pagination">
          <table className="leaderboard-table">
            <tbody>{renderMyRow(myItem)}</tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default TableBody;
