const session = require("express-session");

module.exports = session({
  secret: "gamblingforlife",
  name: "session_id",
  cookie: {
    maxAge: 10 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: false,
});
