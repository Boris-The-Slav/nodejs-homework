const AuthModel = require("../models/auth.model");

const authModel = new AuthModel();

class AuthController {
  registerUser(userData) {
    return authModel.registerUser(userData);
  }
  loginUser(credentials) {
    return authModel.loginWithEmailAndPassword(credentials);
  }
}

module.exports = AuthController;
