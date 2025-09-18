import { Checks, Atom, Flask, MathOperations,Target } from "phosphor-react";
import Score from "./Score";
import Stats from "./Stats";
import Accuracy from "./Accuracy";
import "./TopThreeLeaderBoard.css";
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
                  <Score item={item} />
                  <Stats item={item} />
                  <Accuracy item={item}/>
            </div>




          </div>
        ))}
         

export default TopThreeLeaderBoard;