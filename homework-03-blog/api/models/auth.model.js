const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");

const DB_URL =
  "https://blog-roulette-hwork-default-rtdb.europe-west1.firebasedatabase.app/users";

class AuthModel {
  loginWithEmailAndPassword(credentials) {
    return new Promise((resolve, reject) => {
      fetch(`${DB_URL}.json`)
        .then(res => res.json())
        .then(data => {
          const dataArr = Object.values(data);
          const user = dataArr.find(
            user =>
              user.email === credentials.email &&
              bcrypt.compareSync(credentials.password, user.password)
          );
          if (user) {
            resolve({
              message: "user logged in",
              role: user.role,
              username: user.username,
            });
          } else {
            reject({ message: "invalid credentials" });
          }
        });
    });
  }
  registerUser = async userData => {
    try {
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
