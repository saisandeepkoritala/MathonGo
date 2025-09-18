import { useEffect, useState } from "react";
import TopThreeLeaderBoard from "./components/TopThreeLeaderBoard";
import TableBody from "./components/TableBody";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("light"); // light/dark mode
  const myRank = 72;

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  useEffect(() => {
    extractLeaderboardData();
  }, []);

  const extractLeaderboardData = async () => {
    const response = await axios.get(
      "https://api.quizrr.in/api/hiring/leaderboard?page=1&limit=100"
    );
    setData(response?.data?.data?.results);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const topThree = data.slice(0, 3);
  if (myRank > 3) {
    const myData = data.find((item) => item.rank === myRank);
    if (myData) topThree.push(myData);
  }

  const others = data.slice(3);

  return (
  <div className={`leaderboard ${theme}`} style={{ 
      backgroundColor: `var(--background)`, 
      color: `var(--foreground)` 
  }}>
    <button
      onClick={toggleTheme}
      className="btn"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>

    <div className="top-three">
      <TopThreeLeaderBoard topThree={topThree} getOrdinal={getOrdinal} theme={theme} />
    </div>

    <TableBody others={others} myRank={myRank} theme={theme} />
  </div>
);

}

export default App;
