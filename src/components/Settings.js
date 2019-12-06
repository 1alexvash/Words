import React from "react";

const Settings = ({
  setDarkMode,
  darkMode,
  setSoundsAvailabilitty,
  soundsAvailable
}) => {
  return (
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
  );
};

export default Settings;
