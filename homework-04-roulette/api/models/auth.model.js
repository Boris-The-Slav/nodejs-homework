const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { valid } = require("joi");

const DB_URL =
  "https://blog-roulette-hwork-default-rtdb.europe-west1.firebasedatabase.app/gamblers";

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().alphanum(),
  password: Joi.string().min(6).max(30).required(),
  balance: Joi.number().min(500).required(),
  email: Joi.string().email().required(),
});

class AuthModel {
  loginWithEmailAndPassword(credentials) {
    return new Promise((resolve, reject) => {
      fetch(`${DB_URL}.json`)
        .then(res => res.json())
        .then(data => {
          const dataArr = Object.keys(data);
          const id = dataArr.find(
            key =>
              data[key].email === credentials.email &&
              bcrypt.compareSync(credentials.password, data[key].password)
          );
          if (id) {
            resolve({
              message: "user logged in",
              balance: data[id].balance,
              username: data[id].username,
              id: id,
            });
          } else {
            reject({ message: "Invalid Credentials" });
          }
        });
    });
  }
  registerUser = async userData => {
    try {
      const validateUser = userSchema.validate(userData);
      if (validateUser?.error) {
        return Promise.reject(validateUser.error.details[0]);
      }

      userData.password = await bcrypt.hash(userData.password, 8);
      const response = await fetch(`${DB_URL}.json`);
      const users = await response.json();

      if (users) {
        const usersArr = Object.values(users);
        const isValidEmail = !usersArr.filter(
          user => user.email === userData.email
        ).length;
        const isValidUsername = !usersArr.filter(
          user => user.username === userData.username
        ).length;
        if (!isValidEmail) {
          return Promise.reject({ message: "Email Already Registered" });
        }
        if (!isValidUsername) {
          return Promise.reject({ message: "Username Already Taken" });
        }
      }

      return fetch(`${DB_URL}.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then(res => res.json());
    } catch (error) {
      return console.log(error);
    }
  };
}

module.exports = AuthModel;
