import React, { useState } from "react";

const Preloader = () => {
  const [preloaderShown, setPreloaderVisiblity] = useState(true);

  setTimeout(() => {
    setPreloaderVisiblity(false);
  }, 5000);

  return preloaderShown ? (
    <div className="preloader">
      <div className="content">
        {" "}
        <div className="text">
          <div className="title">Words</div>
          <div className="loading">
            Loading{" "}
            <span className="dots">
              <span className="dot dot-one">.</span>
              <span className="dot dot-two">.</span>
              <span className="dot dot-three">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Preloader;
