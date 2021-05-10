const router = require("express").Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

router.post("/login", (req, res) => {
  const credentials = req.body;
  if (credentials && credentials.email && credentials.password) {
    authController
      .loginUser(req.body)
      .then(response => {
        req.session.authenticated = true;
        req.session.balance = response.balance;
        req.cookie = req.session.cookie;
        res.status(200).send(response);
      })
      .catch(err => res.status(400).send(err));
  }
});

router.post("/register", (req, res) => {
  authController
    .registerUser(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => res.status(400).send(err));
});

router.post("/logout", (req, res) => {
  if (req.session.authenticated) {
    req.session.authenticated = undefined;
    res.status(200).json({ message: "User logged out!" });
  } else {
    res.json({ message: "No user logged in!" });
  }
});

module.exports = router;
