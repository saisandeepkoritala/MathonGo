import { useState, useEffect, useRef } from "react";
import TableBodyRows from "./TableBodyRows";
import renderMyRow from "./MyRow";
import Pagination from "./Pagination";
import "./TableBody.css";

const TableBody = ({ others, myRank }) => {
  const rowsPerPage = 10;
  const tableRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [atBottom, setAtBottom] = useState(false);

  const myItem = others.find((item) => item.rank === myRank);
  const totalPages = Math.ceil(others.length / rowsPerPage);

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

  const myVisibleOnPage = currentRows.some((r) => r.rank === myRank);
  const shouldRenderSticky = myItem && currentPage !== myPage;

  return (
    <div style={{ position: "relative" }}>
      {/* Table wrapper */}
      <div ref={tableRef} style={{ maxHeight: "400px", overflowY: "auto" }} className="table-responsive">
        <table className="leaderboard-table">
          <colgroup>
            <col style={{ width: "8%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>

          <thead>
            <tr style={{ color: `var(--text-color)`, backgroundColor: `#f5f9fe`, borderRadius: "16px",fontSize: "12px",fontFamily: "Poppins, sans-serif" }}>
      
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

        {/* Sticky row at bottom while scrolling */}
        {shouldRenderSticky && !myVisibleOnPage && !atBottom && (
          <div className="sticky-row-overlay">
            <table className="leaderboard-table">
              <tbody>{renderMyRow(myItem)}</tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination and sticky row below it when scrolled to bottom */}
      {atBottom && shouldRenderSticky && !myVisibleOnPage && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
          <div className="row-below-pagination">
            <table className="leaderboard-table">
              <tbody>{renderMyRow(myItem)}</tbody>
            </table>
          </div>
        </>
      )}

      {/* Show pagination normally if at bottom but my row is already on page */}
      {atBottom && myVisibleOnPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
};

export default TableBody;
