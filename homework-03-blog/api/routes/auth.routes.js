const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

router.post("/register", (req, res) => {
  authController
    .registerUser(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => res.status(401).send(err));
});

router.post("/login", (req, res) => {
  const credentials = req.body;
  if (credentials && credentials.email && credentials.password) {
    authController
      .loginUser(req.body)
      .then(response => {
        req.session.authenticated = true;
        req.session.role = response.role;
        req.session.username = response.username;
        console.log(req.session.id);
        console.log(req.session);
        req.cookie = req.session.cookie;
        res.status(200).send(response);
      })
      .catch(error => res.status(401).json(error));
  }
});

router.post("/logout", (req, res) => {
  if (req.session.authenticated) {
    req.session.authenticated = undefined;
    res.status(200).json({ message: "user logged out!" });
  } else {
    res.json({ message: "no user logged in!" });
  }
});

module.exports = router;
