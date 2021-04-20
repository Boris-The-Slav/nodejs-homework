const express = require("express");
const textService = require("./textService");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { text } = require("express");

const app = express();
app.use(cors());

app.use(express.json());
const PORT = 3000;

app.get("/users", (req, res) => {
  const users = textService.readDataFromDb("./api/db.json");
  res.send(users);
});

app.post("/users", (req, res) => {
  const users = JSON.parse(textService.readDataFromDb("./api/db.json"));
  const newUser = req.body;
  newUser.id = uuidv4();
  textService.writeDataToDb(
    "./api/db.json",
    JSON.stringify([...users, newUser])
  );
  res.send();
});

app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(textService.readDataFromDb("./api/db.json"));
  const filteredUsers = users.filter(user => "" + user.id !== req.params.id);
  textService.writeDataToDb("./api/db.json", JSON.stringify(filteredUsers));
});

app.listen(3000, () => {
  console.log(`Server is up on ${PORT}`);
});
