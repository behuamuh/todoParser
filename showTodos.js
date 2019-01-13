function showTodos(todos) {
  const importants = [true],
    users = ["user"],
    dates = ["date"],
    comments = ["comment"],
    fileNames = ["fileName"];
  todos.forEach((todo, index) => {
    const [user, date, comment, fileName] = todo.split(";");
    const importtant = comment.indexOf("!") !== -1;
    importants[index + 1] = importtant;
    users[index + 1] = user.trim();
    dates[index + 1] = date.trim();
    comments[index + 1] = comment.replace(/\!/g, "").trim();
    fileNames[index + 1] = fileName.trim();
  });
  const uSize = getCellSize(users, 10);
  const dSize = getCellSize(dates, 10);
  const cSize = getCellSize(comments, 50);
  const fSize = getCellSize(fileNames, 15);
  const fImportants = importants.map(imp => (imp ? "  !  " : "     "));
  const fUsers = formatCell(users, uSize);
  const fDates = formatCell(dates, dSize);
  const fComments = formatCell(comments, cSize);
  const fFileNames = formatCell(fileNames, fSize);

  for (let i = 0; i <= todos.length; i++) {
    const result = [
      fImportants[i],
      fUsers[i],
      fDates[i],
      fComments[i],
      fFileNames[i]
    ].join("|");
    console.log(result);
    if (!i || i === todos.length) {
      console.log(new Array(result.length).fill("-").join(""));
    }
  }
}

function getCellSize(data, maxSize) {
  const dataLengths = data.map(item => item.length);
  const maxLength = Math.max(...dataLengths);
  return maxLength < maxSize ? maxLength : maxSize;
}

function formatCell(data, size) {
  return data.map(item => {
    return item.length > size
      ? `  ${item.slice(0, size - 3)}...  `
      : `  ${fillToSize(item, size)}  `;
  });
}

function fillToSize(string, size) {
  const tailSize = size - string.length;
  if (tailSize < 1) return string;
  const tail = new Array(tailSize).fill(" ").join("");
  return string + tail;
}

module.exports = {
  showTodos
};
