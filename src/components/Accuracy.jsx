import { Checks, Atom, Flask, MathOperations,Target } from "phosphor-react";
import "./Accuracy.css";
const Accuracy = ({ item }) => {
    return (
        <div className="accuracy">
          <div className="accuracy-line">
            <div className="accuracy-name">
                <Target size={16} color="var(--accuracy-color)" />
            </div>
            <div className="accuracy-text">
                <p>Accuracy</p>
            </div>
          </div>
          <div className="accuracy-value">{Number(item.accuracy).toFixed(2)}%</div>
      </div>
    );
}

export default Accuracy;
