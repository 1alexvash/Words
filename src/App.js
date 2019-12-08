import React, { useState, useEffect, useRef } from "react";
import successSoundUrl from "./sounds/sound_success.mp3";
import failureSoundUrl from "./sounds/sound_failure.mp3";

import Preloader from "./components/Preloader";
import Score from "./components/Score";
import Settings from "./components/Settings";

import returnIcon from "./img/return.png";

import "./scss/main.css";

import words from "./words.json";

const successSound = new Audio(successSoundUrl);
const failureSound = new Audio(failureSoundUrl);

const gameLevels = [0, 10, 25, 50, 80, 125, 200, 300, 500, 1000];

const App = () => {
  const [gameLevel, setGameLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [soundsAvailable, setSoundsAvailabilitty] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [randomWord, setRandomWord] = useState("");
  const [mixedWordBeforeTip, setMixedWordBeforeTip] = useState("");
  const [mixedWordAfterTip, setMixedWordAfterTip] = useState("");

  function startGame(difficulty) {
    setDifficulty(difficulty);
  }

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;

      if (localStorage.score !== undefined) {
        const newScore = parseInt(localStorage.score);
        setScore(newScore);
      }
    } else {
      localStorage.score = score;
    }

    gameLevels.forEach((level, index) => {
      if (score >= level) {
        setGameLevel(index);
      }
    });

    // eslint-disable-next-line
  }, [score]);

  useEffect(() => {
    if (difficulty > 0) {
      getRandomWord();
    }
  }, [difficulty]); // eslint-disable-line

  function getRandomWord() {
    const listOfWords = [0, 100, 500, 1000, 2000, 5000];

    const min = listOfWords[difficulty - 1];
    const max = listOfWords[difficulty] - min;

    const randomWord = words[min + Math.floor(Math.random() * max)];
    setMixedWordBeforeTip("");
    setRandomWord(randomWord);
  }

  useEffect(() => {
    if (randomWord !== "") {
      let wordBeforeMixing = randomWord.split("");

      let afterMixing = "";

      while (wordBeforeMixing.length > 0) {
        const index = Math.floor(Math.random() * wordBeforeMixing.length);
        afterMixing += wordBeforeMixing.splice(index, 1);
      }

      setMixedWordAfterTip(afterMixing);
    }
  }, [randomWord]);

  function returnBack() {
    setDifficulty(0);
  }

  function askForTip() {
    if (mixedWordAfterTip.length > 0) {
      const tipLetter =
        randomWord[randomWord.length - mixedWordAfterTip.length];
      setMixedWordBeforeTip(mixedWordBeforeTip + tipLetter);
      setMixedWordAfterTip(mixedWordAfterTip.replace(tipLetter, ""));
      updateScore(-2);
    }
  }

  function skipWord() {
    getRandomWord();
    updateScore(-1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target.text.value !== "") {
      if (e.target.text.value.toLowerCase() === randomWord.toLowerCase()) {
        getRandomWord();
        e.target.text.value = "";
        playSound(successSound);
        updateScore(1 + 2 * difficulty);
      } else {
        playSound(failureSound);
        updateScore(-1);
      }
    }
  }

  function updateScore(diff) {
    if (diff + score <= 0) {
      setScore(0);
    } else if (diff + score >= 1000) {
      setScore(1000);
    } else {
      setScore(score + diff);
    }
  }

  function playSound(sound) {
    if (soundsAvailable) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Preloader />
      {difficulty === 0 ? (
        <div className="difficulty">
          <h1>Choose difficulty:</h1>
          <button onClick={() => startGame(1)}>Easy</button>
          <button onClick={() => startGame(2)}>Medium</button>
          <button onClick={() => startGame(3)}>Difficult</button>
          <button onClick={() => startGame(4)}>Pro</button>
          <button onClick={() => startGame(5)}>Impossible</button>
        </div>
      ) : (
        <div className="game">
          <div className="mixed-word" title="Guess this word">
            <span className="mixed-word-tip">{mixedWordBeforeTip}</span>
            {mixedWordAfterTip}
          </div>
          <button
            className="return"
            title="Return to the menu"
            onClick={() => returnBack()}
          >
            <img src={returnIcon} alt="Return img" />
          </button>
          <button
            className="tip"
            title="Ask for a tip"
            onClick={() => askForTip()}
          >
            Tip
          </button>
          <button
            className="skip"
            title="Skip this word"
            onClick={() => skipWord()}
          >
            Skip
          </button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              minLength={randomWord.length}
              maxLength={randomWord.length}
              placeholder="Answer"
            />
          </form>
        </div>
      )}
      <Score gameLevel={gameLevel} gameLevels={gameLevels} score={score} />
      <Settings
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setSoundsAvailabilitty={setSoundsAvailabilitty}
        soundsAvailable={soundsAvailable}
      />
    </div>
  );
};

export default App;
