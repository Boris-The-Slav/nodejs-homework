const fetch = require("node-fetch");
const playGameFunc = require("../game/game.const");

const DB_URL =
  "https://blog-roulette-hwork-default-rtdb.europe-west1.firebasedatabase.app/";

class GameModel {
  playGame = async (bets, id) => {
    try {
      const playerBalance = await this.fetchPlayerBalance(id);
      const houseBalance = await this.fetchHouseBalance();

      if (playerBalance < 0) {
        return Promise.reject({ message: "Player has run out of credits" });
      }

      const results = playGameFunc(bets);
      const result = results.results.reduce((acc, el) => acc + el, 0);
      const newPlayerBalance = await this.updatePlayerBalance(
        { balance: playerBalance + result },
        id
      );
      await this.updateHouseBalance({
        balance: houseBalance + -result,
      });

      if (newPlayerBalance.balance < 0) {
        return Promise.reject({ message: "Player has run out of credits" });
      }
      return Promise.resolve({
        newPlayerBalance,
        result: {
          message: result > 0 ? "You win" : "You lose",
          total: result,
          gameValue: results.gameValue,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  chargePlayerBalance = async (data, id) => {
    const playerBalance = await this.fetchPlayerBalance(id);
    const newBalance = { balance: playerBalance + data.balance };
    return this.updatePlayerBalance(newBalance, id);
  };

  fetchPlayerBalance(id) {
    return fetch(`${DB_URL}/gamblers/${id}/balance.json`).then(res =>
      res.json()
    );
  }
  fetchHouseBalance() {
    return fetch(`${DB_URL}/house/balance.json`).then(res => res.json());
  }

  updatePlayerBalance(newBalance, id) {
    return fetch(`${DB_URL}/gamblers/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBalance),
    }).then(res => res.json());
  }
  updateHouseBalance(newBalance) {
    return fetch(`${DB_URL}/house.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBalance),
    }).then(res => res.json());
  }
}

module.exports = GameModel;
