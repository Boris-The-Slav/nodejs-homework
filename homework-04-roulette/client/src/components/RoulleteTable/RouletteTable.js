import React from "react";
import TableField from "./TableField/TableField";

import classes from "./RouletteTable.module.css";

const RouletteTable = props => {
  const onFieldClick = (id, betAmmount) => {
    const betData = id.split("-");
    props.onBetAdd(oldBets => {
      return {
        ...oldBets,
        [id]: {
          betType: betData[0],
          betValue: Number(betData[1]),
          betAmmount: betAmmount,
        },
      };
    });
  };

  const playFieldsArr = [];

  for (let i = 3; i >= 1; i--) {
    for (let j = i; j <= 36; j += 3) {
      playFieldsArr.push(
        <TableField
          isBetValid={props.isBetValid}
          isReset={props.isReset}
          startingBalance={props.startingBalance}
          onBalanceUpdate={props.onPlayerBalanceUpdate}
          betAmmount={props.betAmmount}
          onFieldClick={onFieldClick}
          id={`straight-${j}`}
          key={`straight-${j}`}
          fieldText={j}
          fieldStyle={{ backgroundColor: j % 2 === 0 ? "red" : "black" }}
        />
      );
    }
  }
  for (let i = 1; i <= 3; i++) {
    playFieldsArr.push(
      <TableField
        isBetValid={props.isBetValid}
        isReset={props.isReset}
        startingBalance={props.startingBalance}
        onBalanceUpdate={props.onPlayerBalanceUpdate}
        chipStyle={{ bottom: "-2px", right: "-3px" }}
        betAmmount={props.betAmmount}
        onFieldClick={onFieldClick}
        id={`dozen-${i}`}
        key={`dozen-${i}`}
        fieldText={
          <span>
            {i}
            <small>st</small>
            12
          </span>
        }
        fieldStyle={{
          gridRow: "4/5",
          gridColumn: `${i + 1 + 3 * (i - 1)}/${i + 5 + 3 * (i - 1)}`,
        }}
      />
    );
  }
  for (let i = 1; i <= 2; i++) {
    playFieldsArr.push(
      <TableField
        isBetValid={props.isBetValid}
        isReset={props.isReset}
        startingBalance={props.startingBalance}
        onBalanceUpdate={props.onPlayerBalanceUpdate}
        chipStyle={{ bottom: "-2px", right: "-3px" }}
        betAmmount={props.betAmmount}
        onFieldClick={onFieldClick}
        id={`oddEven-${(i + 5) % 4}`}
        key={`oddEven-${(i + 3) % 4}`}
        fieldText={i === 1 ? "EVEN" : "ODD"}
        fieldStyle={{
          gridRow: "5/6",
          gridColumn: `${4 + 6 * (i - 1)}/${6 + 6 * (i - 1)}`,
        }}
      />
    );
    playFieldsArr.push(
      <TableField
        isBetValid={props.isBetValid}
        isReset={props.isReset}
        startingBalance={props.startingBalance}
        onBalanceUpdate={props.onPlayerBalanceUpdate}
        betAmmount={props.betAmmount}
        onFieldClick={onFieldClick}
        id={`color-${(i + 5) % 4}`}
        key={`color-${(i + 3) % 4}`}
        fieldText={i === 1 ? "RED" : "BLACK"}
        chipStyle={{ bottom: "-2px", right: "-3px" }}
        fieldStyle={{
          backgroundColor: i === 1 ? "red" : "black",
          gridRow: "5/6",
          gridColumn: `${6 + 2 * (i - 1)}/${8 + 2 * (i - 1)}`,
        }}
      />
    );
    playFieldsArr.push(
      <TableField
        isBetValid={props.isBetValid}
        isReset={props.isReset}
        startingBalance={props.startingBalance}
        onBalanceUpdate={props.onPlayerBalanceUpdate}
        chipStyle={{ bottom: "-2px", right: "-3px" }}
        betAmmount={props.betAmmount}
        onFieldClick={onFieldClick}
        id={`half-${i * 18}`}
        key={`half-${i * 18}`}
        fieldText={
          <span>
            {i}
            <small>to</small>
            {i * 18}
          </span>
        }
        fieldStyle={{
          gridRow: "5/6",
          gridColumn: `${2 + 10 * (i - 1)}/${4 + 10 * (i - 1)}`,
        }}
      />
    );
  }

  return (
    <div className={classes.RouletteTable}>
      <TableField
        isBetValid={props.isBetValid}
        isReset={props.isReset}
        startingBalance={props.startingBalance}
        onBalanceUpdate={props.onPlayerBalanceUpdate}
        chipStyle={{ bottom: "-2px", right: "-3px" }}
        betAmmount={props.betAmmount}
        fieldText="0"
        customClass="Zero"
        onFieldClick={onFieldClick}
        key={"straight-0"}
        id="straight-0"
      >
        <div className="Zero__top"></div>
        <div className="Zero__bottom"></div>
      </TableField>
      {playFieldsArr}
    </div>
  );
};

export default RouletteTable;
