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
    userData.password = await bcrypt.hash(userData.password, 8);
    return fetch(`${DB_URL}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(res => res.json());
  };
}

module.exports = AuthModel;
