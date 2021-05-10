import React from "react";

import classes from "./Chip.module.css";

const Chip = props => {
  return (
    <div className={classes.Chip} style={props.chipStyle}>
      <div className={classes.Chip__outer}>
        <div className={classes.Chip__inner}>
          <div className={classes.Chip__inner2}>{props.value}</div>
        </div>
      </div>
    </div>
  );
};

export default Chip;
