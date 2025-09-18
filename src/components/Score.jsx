import { Checks, Atom, Flask, MathOperations,Target } from "phosphor-react";
import "./Score.css";
const Score = ({ item }) => {
    return (
        <div className="score">
            <div className="score-line">
                <div className="score-name">
                    <div className="icon">
                        <Checks size={18} weight="duotone" />
                    </div>
                    <div className="score-text">
                        <p>Overall Score</p>
                    </div>
                </div>
            </div>
            <div className="score-value">
            <strong>{item.totalMarkScored}</strong>/300
            </div>
  </div>
    );
};

export default Score;