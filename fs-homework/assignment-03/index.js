const fs = require("fs");
const stripIndent = require("strip-indent");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getQuestions = () => {
  const data = JSON.parse(fs.readFileSync("./questions.json"));
  return data.questions;
};

const questions = getQuestions();

let i = 0;
let correctCount = 0;

const testing = () => {
  console.log(questions[i].meta);
  questions[i].all.forEach((answer, index) => {
    console.log(`${index + 1}. ${answer}`);
  });
  rl.question("Select answer (only number) ", answer => {
    if (questions[i].all[answer - 1] === questions[i].correct) correctCount++;
    if (i === questions.length - 1) {
      console.log(
        `You guessed ${correctCount} questions right. Thanks for playing the AWESOMETACULAR RECURSIVE READLINE QUIZ!!! SOULS FTW BTW`
      );
      return rl.close();
    } else {
      i++;
      testing();
    }
  });
};

testing();
