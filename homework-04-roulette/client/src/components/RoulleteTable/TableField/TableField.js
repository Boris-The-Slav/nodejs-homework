import React, { useState, useEffect, Fragment } from "react";

import classes from "./TableField.module.css";
import Chip from "../Chip/Chip";

const TableField = props => {
  const [betAmmount, setBetAmmount] = useState(null);
  const [isBetting, setIsBetting] = useState(false);
  const { onBalanceUpdate, isBetValid } = props;

  useEffect(() => {
    onBalanceUpdate(props.startingBalance);
    setBetAmmount(null);
    setIsBetting(false);
  }, [props.isReset, props.startingBalance, onBalanceUpdate]);

  useEffect(() => {}, [isBetValid]);

  return (
    <div
      className={classes.TableField + " " + classes[props.customClass]}
      style={props.fieldStyle}
      onClick={e => {
        if (isBetValid) {
          setBetAmmount(oldBet => {
            return oldBet + props.betAmmount;
          });
          setIsBetting(true);
          props.onBalanceUpdate(oldBalance => oldBalance - props.betAmmount);
          props.onFieldClick(props.id, betAmmount + props.betAmmount);
        }
      }}
    >
      <p>{props.fieldText}</p>
      {isBetting && <Chip value={betAmmount} chipStyle={props.chipStyle} />}
      {props.id === "straight-0" ? (
        <Fragment>
          {" "}
          <div className={classes.Zero__top}></div>
          <div className={classes.Zero__bottom}></div>
        </Fragment>
      ) : null}

      {props.children}
    </div>
  );
};

export default TableField;
