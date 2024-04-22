import React from "react";
import "./backButton.css";

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button className="backButton" onClick={goBack}>
      Go Back
    </button>
  );
};

export default BackButton;
