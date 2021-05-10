import React from "react";

import wheelImage from "../../images/roulette.png";

import classes from "./RouletteWheel.module.css";

const RouletteWheel = props => {
  return (
    <div className={classes.Wheel__outer}>
      <img src={wheelImage} alt="roulette wheel"></img>
    </div>
  );
};

export default RouletteWheel;
