const TableBodyRows = ({ currentRows}) => {
    return (<tbody>
            {currentRows.map((item, idx) => (
              <tr key={idx}>
                <td>{item.rank}</td>
                <td className="student-info">
                  <img
                    src={item.userId?.profilePicture || "https://imgs.search.brave.com/sHfS5WDNtJlI9C_CT2YL2723HttEALNRtpekulPAD9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzMzLzU0Lzc4/LzM2MF9GXzYzMzU0/Nzg0Ml9BdWdZemV4/VHBNSjl6MVljcFRL/VUJvcUJGMENVQ2sx/MC5qcGc"}
                    alt="Profile"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    onError={(e) => (e.target.src = "/fallback.png")}
                  />
                  {item.userId?.name}
                </td>
                <td>{item.totalMarkScored}/300</td>
                <td>
                  {item.subjects.find((s) => s.subjectId.title === "Physics")
                    ?.totalMarkScored}
                </td>
                <td>
                  {item.subjects.find((s) => s.subjectId.title === "Chemistry")
                    ?.totalMarkScored}
                </td>
                <td>
                  {item.subjects.find((s) => s.subjectId.title === "Mathematics")
                    ?.totalMarkScored}
                </td>
                <td>{Number(item.accuracy).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>);
};

export default TableBodyRows;