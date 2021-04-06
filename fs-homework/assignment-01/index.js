const { get } = require("http");
const readline = require("readline");
const userService = require("./users-service");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  `Options (input number)
1 Login
2 Register
`
);

rl.question("Choose Action ", answer => {
  if (answer === "1") {
    console.log(`==========\n  Login\n==========`);
    rl.question("Enter Username: ", username => {
      rl.question("Enter Password: ", password => {
        userService.loginUser(username, password);
        rl.close();
      });
    });
  } else if (answer === "2") {
    console.log(`==========\n  Register\n==========`);
    rl.question("Enter Username: ", username => {
      rl.question("Enter Password: ", password => {
        userService.addUser({ username, password });
        rl.close();
      });
    });
  } else {
    console.log("Invalid Option");
    rl.close();
  }
});
