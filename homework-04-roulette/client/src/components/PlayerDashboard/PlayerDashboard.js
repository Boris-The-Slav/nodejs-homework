import React, { useEffect } from "react";
import Chip from "../RoulleteTable/Chip/Chip";

import auth from "../../api/auth";

import classes from "./PlayerDashboard.module.css";

const PlayerDashboard = props => {
  console.log(props.playerBalance);
  console.log(classes);
  const {
    chipIndexValue,
    onBetValueChange,
    chipValuesArr,
    setChipArrIndex,
  } = props;
  useEffect(() => {
    if (chipIndexValue <= 0) {
      setChipArrIndex(0);
    }
    if (chipIndexValue === 5) {
      setChipArrIndex(0);
    }

    onBetValueChange(() => chipValuesArr[chipIndexValue]);
  }, [chipIndexValue, chipValuesArr, onBetValueChange, setChipArrIndex]);

  return (
    <div className={classes.PlayerDashboard}>
      <div className={classes.Balance}>
        <p>Balance:</p>
        <p>{props.playerBalance}</p>
      </div>
      <div className={classes.BetControls}>
        <div className={classes.BetControls__chip}>
          <Chip
            value={props.chipValue}
            chipStyle={{
              position: "static",
              transform: "scale(1.8)",
              marginTop: "28px",
            }}
          />
          <button
            className={classes.BetControls__button}
            onClick={() => props.onReset(oldReset => !oldReset)}
          >
            RESET
          </button>
        </div>
        <div className={classes.BetControls__arrows}>
          <div
            className={classes.BetControls__up}
            onClick={() => {
              props.setChipArrIndex(value => value + 1);
            }}
          >
            🔼
          </div>
          <div
            className={classes.BetControls__down}
            onClick={() => {
              props.setChipArrIndex(value => value - 1);
            }}
          >
            🔽
          </div>
        </div>
      </div>
      <button className={classes.PlayButton} onClick={props.onBetsPost}>
        PLAY!
      </button>
      <button
        className={`${classes.ChargeBalanceButton} ${
          props.playerBalance <= 0 ? classes.ChargeButtonAnimation : "test"
        }`}
        onClick={() => props.setShowBalanceModal(true)}
      >
        ADD CREDITS
      </button>
      <button
        className={classes.LogoutButton}
        onClick={() => {
          auth
            .post("/logout")
            .then(res => {
              props.onLogout(false);
            })
            .catch(err => console.log(err));
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default PlayerDashboard;
