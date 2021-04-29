const roleValidator = role => {
  return (req, res, next) => {
    if (req.session.role === role || req.session.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "user is not authorised to make this request" });
    }
  };
};

module.exports = roleValidator;
