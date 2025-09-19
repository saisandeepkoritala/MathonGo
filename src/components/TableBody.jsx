import { useState, useEffect, useRef } from "react";
import TableBodyRows from "./TableBodyRows";
import renderMyRow from "./MyRow";
import Pagination from "./Pagination";
import "./TableBody.css";
import DesktopStickyRow from "./DesktopStickyRow";

const TableBody = ({ others, myRank }) => {
  const rowsPerPage = 10;
  const tableRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [atBottom, setAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

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

  // Track screen resize for mobile check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Table wrapper */}
      <div ref={tableRef} className="table-responsive">
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
            <tr
              style={{
                color: `var(--colheadercolor)`,
                backgroundColor: `#f5f9fe`,
                borderRadius: "16px",
                fontSize: "12px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
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
        <DesktopStickyRow isMobile shouldRenderSticky myVisibleOnPage atBottom renderMyRow myItem />
      </div>
            
      {atBottom && (
          <Pagination  currentPage={currentPage}  totalPages={totalPages} 
          onPageChange={handlePageClick} />
      )}
      <div className="row-below-pagination">
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
          <tbody>{renderMyRow(myItem)}</tbody>
        </table>
    </div>

      {/* Mobile view → Student Info Card */}
      {isMobile && myItem && (
        <div className="student-card">
          <h4>{myItem.student}</h4>
          <p><strong>Rank:</strong> {myItem.rank}</p>
          <p><strong>Overall Score:</strong> {myItem.totalMarkScored}</p>
          <p><strong>Physics:</strong> {myItem.subjects[1].totalMarkScored}</p>
          <p><strong>Chemistry:</strong> {myItem.subjects[2].totalMarkScored}</p>
          <p><strong>Maths:</strong> {myItem.subjects[0].totalMarkScored}</p>
          <p><strong>Accuracy:</strong> {myItem.accuracy}%</p>
        </div>
      )}
    </div>
  );
};

export default TableBody;
