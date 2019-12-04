import React, { useState, useEffect } from "react";
import successSoundUrl from "./sounds/sound_success.mp3";
import failureSoundUrl from "./sounds/sound_failure.mp3";

import "./scss/main.css";

import words from "./words.json";

import returnIcon from "./img/return.png";

const successSound = new Audio(successSoundUrl);
const failureSound = new Audio(failureSoundUrl);

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [soundsAvailable, setSoundsAvailabilitty] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [randomWord, setRandomWord] = useState("");
  const [mixedWordBeforeTip, setMixedWordBeforeTip] = useState("");
  const [mixedWordAfterTip, setMixedWordAfterTip] = useState("");

  function startGame(difficulty) {
    setDifficulty(difficulty);
  }

  useEffect(() => {
    if (difficulty > 0) {
      getRandomWord();
    }
  }, [difficulty]); // eslint-disable-line

  function getRandomWord() {
    const levels = [0, 100, 500, 1000, 2000, 5000];

    const min = levels[difficulty - 1];
    const max = levels[difficulty] - min;

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
    }
  }

  function skipWord() {
    getRandomWord();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target.text.value.toLowerCase() === randomWord.toLowerCase()) {
      getRandomWord();
      e.target.text.value = "";
      playSound(successSound);
    } else {
      playSound(failureSound);
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

      <div className="settings">
        <label htmlFor="dark-mode">
          <p>Dark Mode</p>
          <input
            onChange={e => setDarkMode(e.target.checked)}
            checked={darkMode}
            type="checkbox"
            name="dark-mode"
            id="dark-mode"
          />
          <span className="slider"></span>
        </label>
        <label htmlFor="turn-on-sound">
          <p>Sound</p>
          <input
            onChange={e => setSoundsAvailabilitty(e.target.checked)}
            checked={soundsAvailable}
            type="checkbox"
            name="turn-on-sound"
            id="turn-on-sound"
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default App;

/*
  THINGS TO DO
  Publish go github
  Publish to gh-pages
  Add some kind of preloader
  Come up with some scoring system
  Add some scoring system - maybe
*/
