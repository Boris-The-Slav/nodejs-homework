const straight = (betValue, gameValue, betAmmount) => {
  if (gameValue === betValue) {
    return betAmmount * 35;
  } else {
    return -betAmmount;
  }
};

const oddEven = (betValue, gameValue, betAmmount) => {
  if (betValue === 0) {
    return -betAmmount;
  } else if (betValue === 3) {
    return gameValue % 2 === 1 ? betAmmount : -betAmmount;
  } else if (betValue === 2) {
    return gameValue % 2 === 0 ? betAmmount : -betAmmount;
  }
};

const dozen = (betValue, gameValue, betAmmount) => {
  if (betValue === 1 && gameValue <= 12) {
    return betAmmount * 2;
  } else if (betValue === 2 && gameValue > 12 && gameValue <= 24) {
    return betAmmount * 2;
  } else if (betValue === 3 && gameValue > 24 && gameValue <= 36) {
    return betAmmount * 2;
  } else {
    return -betAmmount;
  }
};

const half = (betValue, gameValue, betAmmount) => {
  if (betValue <= 18 && gameValue <= 18) {
    return betAmmount;
  } else if (betValue > 18 && gameValue > 18) {
    return betAmmount;
  } else {
    return -betAmmount;
  }
};

module.exports = {
  straight: straight,
  oddEven: oddEven,
  color: oddEven,
  dozen: dozen,
  half: half,
};
