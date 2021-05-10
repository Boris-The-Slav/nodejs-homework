const winningsCalc = require("./wininingsCalc");

const playGame = bets => {
  const gameValue = Math.floor(Math.random() * 37);
  const results = [];
  bets.forEach(bet => {
    results.push(
      winningsCalc[bet.betType](bet.betValue, gameValue, bet.betAmmount)
    );
  });
  return { results, gameValue };
};

module.exports = playGame;
