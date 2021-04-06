const fs = require("fs");

const writeToFile = (fileName, text) => {
  fs.writeFileSync(`./text-data/${fileName}.txt`, text);
  console.log(`${text} has been written to file`);
};

const appendToFile = (fileName, text) => {
  fs.appendFileSync(`./text-data/${fileName}.txt`, text);
  console.log(`${text} has been appended to file`);
};

const readFile = fileName => {
  const data = fs.readFileSync(`./text-data/${fileName}.txt`).toString("utf-8");
  console.log(data);
};

const removeFile = fileName => {
  fs.rmSync(`./text-data/${fileName}.txt`);
};

module.exports = {
  writeToFile,
  appendToFile,
  readFile,
  removeFile,
};
