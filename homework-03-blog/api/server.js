const express = require("express");
const cors = require("cors");
const router = require("./router.const");
const session = require("./session.const");

const app = express();

app.use(cors());
app.use(session);
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/api", router);

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on port ${PORT}`);
});
