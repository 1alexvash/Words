import React from "react";

import winningCup from "../img/winning-cup.png";

const Score = ({ gameLevel, gameLevels, score }) => {
  return (
    <div className="score">
      <div className="progress">
        <div
          className="bar"
          style={{
            width: `${((score - gameLevels[gameLevel]) /
              (gameLevels[gameLevel + 1] - gameLevels[gameLevel])) *
              100 +
              "%"}`
          }}
        ></div>
        Level {gameLevel + 1}
      </div>
      <div className="points">
        [{score}/{gameLevels[gameLevel + 1]}]
        <img src={winningCup} className="icon" alt="Winning Cup" />
      </div>
    </div>
  );
};

export default Score;
