const { getAllFilePathsWithExtension, readFile } = require("./fileSystem");
const { readLine } = require("./console");
const { showTodos } = require("./showTodos");
const { filterTodos } = require("./filterTodos");

app();

function app() {
  const files = getFiles();
  console.log("Please, write your command!");
  readLine(processCommand);
}

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), "js");
  return filePaths.map(path => [readFile(path), path.split("/").slice(-1)[0]]);
}

function getTodos() {
  const regex = new RegExp(/.*\/\/ ?todo(( |:)|(: )|( : )|( +))/i);

  return getFiles()
    .map(file => {
      return file[0]
        .toString()
        .split("\n")
        .filter(line => {
          return line.match(regex);
        })
        .map(line => line.replace(regex, "") + ";" + file[1]);
    })
    .reduce((acc, lines) => acc.concat(lines), []);
}

function processCommand(command) {
  const splittedCommand = command.split(" ").filter(item => item.length > 0);
  const todos = getTodos();
  switch (splittedCommand[0]) {
    case "exit":
      process.exit(0);
      break;
    case "show":
      showTodos(todos);
      break;
    case "important":

    case "user":

    case "date":
    case "sort":
      showTodos(filterTodos(todos, splittedCommand));
      break;
    default:
      console.log("wrong command");
      break;
  }
}
