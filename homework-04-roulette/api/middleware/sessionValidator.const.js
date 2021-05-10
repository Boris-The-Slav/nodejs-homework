const validateSession = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(400).json({
      message: "User not authenticated",
    });
  }
};

module.exports = validateSession;
