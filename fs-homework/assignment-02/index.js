const readline = require("readline");

const textService = require("./textService");
const math = require("./math");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const textServiceHandler = number => {
  if (+number > 4 || !isFinite(number) || +number < 1) {
    rl.close();
    return console.log("Invalid Selection");
  }
  rl.question("Enter Filename: ", fileName => {
    if (number === "2") {
      textService.readFile(fileName);
      rl.close();
      return;
    } else if (number === "4") {
      textService.removeFile(fileName);
      rl.close();
      return;
    }
    rl.question("Enter text: ", text => {
      if (number === "1") {
        textService.writeToFile(fileName, text);
        rl.close();
      } else if (number === "3") {
        textService.appendToFile(fileName, text);
        rl.close();
      }
    });
  });
};

const mathHandler = num => {
  if (num > 4 || !isFinite(num) || num < 1) {
    rl.close();
    return console.log("Invalid Selection");
  }
  const options = Object.keys(math);
  rl.question("Enter number 1: ", num1 => {
    rl.question("Enter number 2: ", num2 => {
      console.log(math[options[num - 1]](+num1, +num2));
      rl.close();
    });
  });
};

rl.question(
  `Choose type of operations (input number)
1. File Operations
2. Math Operations
Selection: `,
  answer => {
    if (answer === "1") {
      rl.question(
        `Choose action: \n1. Write\n2. Read\n3. Append\n4. Remove\nSelection: `,
        number => {
          textServiceHandler(number);
        }
      );
    } else if (answer === "2") {
      rl.question(
        `Choose operation: \n1. Sum\n2. Multiply\n3. Subtract\n4. Divide`,
        num => {
          mathHandler(Number(num));
        }
      );
    } else {
      console.log("Invalid Selection");
      rl.close();
    }
  }
);
