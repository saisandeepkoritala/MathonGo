
const renderMyRow = (myItem) => (
  <tr className="my-row">
    <td>{myItem.rank}</td>
    <td className="student-info">
      <img
        src={myItem.userId?.profilePicture}
        alt={myItem.userId?.name}
        onError={(e) => (e.target.src = "/fallback.png")}
      />
      {myItem.userId?.name} (You)
    </td>
    <td>{myItem.totalMarkScored}/300</td>
    <td>
      {myItem.subjects.find((s) => s.subjectId.title === "Physics")
        ?.totalMarkScored}
    </td>
    <td>
      {myItem.subjects.find((s) => s.subjectId.title === "Chemistry")
        ?.totalMarkScored}
    </td>
    <td>
      {myItem.subjects.find((s) => s.subjectId.title === "Mathematics")
        ?.totalMarkScored}
    </td>
    <td>{Number(myItem.accuracy).toFixed(2)}%</td>
  </tr>
);

export default renderMyRow;
