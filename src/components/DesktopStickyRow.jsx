const DesktopStickyRow = ({ isMobile, shouldRenderSticky, myVisibleOnPage, atBottom, renderMyRow, myItem }) => {
    return (
        !isMobile && shouldRenderSticky && !myVisibleOnPage && !atBottom ? (
            <div className="sticky-row-overlay">
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
        ) : null
    );
}

export default  DesktopStickyRow;

