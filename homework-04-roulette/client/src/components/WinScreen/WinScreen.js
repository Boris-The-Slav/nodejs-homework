import React from "react";

import classes from "./WinScreen.module.css";

const WinScreen = props => {
  let displayStyle = {
    backgroundColor: props.gameValue % 2 === 0 ? "red" : "black",
  };
  if (props.gameValue === 0) {
    displayStyle = {
      backgroundColor: "#107717",
    };
  }

  return (
    <div className={classes.WinScreen}>
      <div className={classes.WinScreen__display} style={displayStyle}>
        {props.gameValue}
      </div>
      <p
        className={classes.WinScreen__victoryMsg}
        style={{ color: props.total > 0 ? "goldenrod" : "red" }}
      >
        {props.message}
      </p>
      <p
        className={classes.WinScreen__result}
        style={{ color: props.total > 0 ? "green" : "red" }}
      >
        {props.total}
      </p>
      <button
        className={classes.WinScreen__button}
        onClick={() => props.setShowModal(false)}
      >
        CONTINUE
      </button>
    </div>
  );
};

export default WinScreen;
