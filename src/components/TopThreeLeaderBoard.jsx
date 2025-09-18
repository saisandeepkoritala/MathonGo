import { Checks, Atom, Flask, MathOperations,Target } from "phosphor-react";

const TopThreeLeaderBoard = ({ topThree, getOrdinal, }) => {
    return topThree.map((item, i) => (
          <div key={i} className={`leaderboard-card rank-${i + 1}`}>
            <div className="card">
              <div className="profile">
                <img
                  src={item.userId?.profilePicture}
                  alt={item.userId?.name}
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.png";
                  }}
                />
              </div>
              <div className="name">{item.userId?.name}</div>
              <div className={`rank${item.rank}`}>
                {getOrdinal(item.rank)} Rank
              </div>
            </div>

            <div className="details">
              <div className="score">
                <div className="score-line">
                        <div className="score-line-in">
                        <div>
                            <Checks
                            size={18}
                            weight="duotone"
                        />
                        </div>
                            <div className="score-text">
                                <p>Overall Score</p></div>
                        </div>
                    </div>
                <div><strong>{item.totalMarkScored}</strong>/300</div>
              </div>

              <div className="subject-scores">
                {["Physics", "Chemistry", "Mathematics"].map((title) => {
                  const sub = item.subjects.find(
                    (s) => s.subjectId.title === title
                  );
                  let Icon;
                  let Color;
                  let name;

                  if (title === "Physics") {
                    Icon = Atom;
                    Color = "var(--physics-color)";
                    name = "Phy Score";
                  }
                  if (title === "Chemistry") {
                    Icon = Flask;
                    Color = "var(--chemistry-color)";
                    name = "Chem Score";
                  }
                  if (title === "Mathematics") {
                    Icon = MathOperations;
                    Color = "var(--mathematics-color)";
                    name = "Maths Score";
                  }

                  return (
                    <div key={title} className="subject-line">
                        <div>
                        <Icon
                            size={18}
                            weight="duotone"
                            color={Color}
                            style={{ marginRight: "6px" }}
                        />
                            <div>{name} </div>
                        </div>
                     <div>{sub ? sub.totalMarkScored : 0}</div>
                    </div>
                  );
                })}
              </div>

              <div className="accuracy">
                <div className="accuracy-line">
                    <div><Target size={16} color="var(--accuracy-color)" /></div>
                    <div>
                        <p>Accuracy</p>
                    </div>
                </div>
                <div>{Number(item.accuracy).toFixed(2)}%</div>
              </div>
            </div>
          </div>
        ))}
         

export default TopThreeLeaderBoard;