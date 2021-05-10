const { response } = require("express");
const GameController = require("../controllers/game.controller");
const gameController = new GameController();
const sessionValidator = require("../middleware/sessionValidator.const");

const router = require("express").Router();

router.patch("/player/:id", sessionValidator, (req, res) => {
  gameController
    .updatePlayerBalance(req.body, req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).send(err));
});

router.patch("/player/charge/:id", sessionValidator, (req, res) => {
  gameController
    .chargePlayerBalance(req.body, req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).send(err));
});

router.post("/bets/:id", sessionValidator, (req, res) => {
  gameController
    .postBets(req.body, req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
