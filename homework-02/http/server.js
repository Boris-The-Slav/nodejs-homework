const http = require("http");
const textService = require("./textService.js");
const { v4: uuidv4 } = require("uuid");
const { restart } = require("nodemon");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  res.setHeader("Access-Control-Max-Age", 2592000);

  if (method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.end();
  }

  if (url.startsWith("/users")) {
    if (method === "GET") {
      const data = textService.readDataFromDb("./api/db.json");
      res.setHeader("Content-Type", "application/json");
      res.write(data);
      res.end();
    }
    if (method === "POST") {
      const body = [];
      req.on("data", chunk => {
        body.push(chunk);
      });

      req.on("end", () => {
        const user = JSON.parse(Buffer.concat(body).toString());
        user.id = uuidv4();
        const dbData = JSON.parse(textService.readDataFromDb("./api/db.json"));
        dbData.push(user);
        textService.writeDataToDb("./api/db.json", JSON.stringify(dbData));
      });
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
