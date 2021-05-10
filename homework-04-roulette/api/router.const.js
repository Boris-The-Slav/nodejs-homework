const router = require("express").Router();

const auth = require("./routes/auth.routes");
const game = require("./routes/game.routes");

router.use("/auth", auth);
router.use("/game", game);

module.exports = router;
