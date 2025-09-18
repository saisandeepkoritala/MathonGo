import { Checks, Atom, Flask, MathOperations, Target } from "phosphor-react";
import "./Stats.css";

const Stats = ({ item }) => {
  const physics = item.subjects.find((s) => s.subjectId.title === "Physics");
  const chemistry = item.subjects.find((s) => s.subjectId.title === "Chemistry");
  const mathematics = item.subjects.find((s) => s.subjectId.title === "Mathematics");

  return (
    <div className="subjects">

      {/* Physics */}
<div className="subject">
  <div className="subject-line">
    <div className="icon">
      <Atom size={18} weight="duotone" color="var(--physics-color)" />
    </div>
    <div className="subject-text">Phy Score</div>
  </div>
  <div className="subject-value">{physics ? physics.totalMarkScored : 0}</div>
</div>

{/* Chemistry */}
<div className="subject">
  <div className="subject-line">
    <div className="icon">
      <Flask size={18} weight="duotone" color="var(--chemistry-color)" />
    </div>
    <div className="subject-text">Chem Score</div>
  </div>
  <div className="subject-value">{chemistry ? chemistry.totalMarkScored : 0}</div>
</div>

{/* Mathematics */}
<div className="subject">
  <div className="subject-line">
    <div className="icon">
      <MathOperations size={18} weight="duotone" color="var(--mathematics-color)" />
    </div>
    <div className="subject-text">Maths Score</div>
  </div>
  <div className="subject-value">{mathematics ? mathematics.totalMarkScored : 0}</div>
</div>


     </div> 
  );
};

export default Stats;
