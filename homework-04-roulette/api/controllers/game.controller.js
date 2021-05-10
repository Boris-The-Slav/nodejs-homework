const GameModel = require("../models/game.model");

const gameModel = new GameModel();

class GameController {
  updatePlayerBalance(newBalance, id) {
    return gameModel.updatePlayerBalance(newBalance, id);
  }
  updateHouseBalance(newBalance) {
    return gameModel.updateHouseBalance(newBalance);
  }
  postBets(bets, id) {
    return gameModel.playGame(bets, id);
  }

  chargePlayerBalance(data, id) {
    return gameModel.chargePlayerBalance(data, id);
  }
}

module.exports = GameController;
