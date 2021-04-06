const fs = require("fs");

const getUsers = () => {
  const data = JSON.parse(fs.readFileSync("./userData.json"));
  return data.users;
};

const loginUser = (username, password) => {
  const users = getUsers();
  const user = users.find(
    user => user.username === username && user.password === password
  );
  if (!user) {
    console.log("INVALID CREDENTIALS");
    return;
  }
  return console.log(`==========\n${user.username} logged in!\n==========`);
};

const addUser = userData => {
  let users = getUsers();
  const userExists = users.find(s => s.username === userData.username);
  if (userExists) {
    return console.log("USERNAME ALREADY REGISTERED");
  }
  users = [...users, userData];

  let data = { users };
  let stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./userData.json", stringifiedData);
  console.log(`${userData.username} registered!`);
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
};
