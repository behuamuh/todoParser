function filterTodos(todos, filter) {
  if (!filter || !filter.length) return todos;

  switch (filter[0]) {
    case "important":
      return todos.filter(
        todo =>
          todo
            .split(";")
            .slice(-2)[0]
            .indexOf("!") !== -1
      );
    case "user":
      return todos.filter(
        todo =>
          todo
            .split(";")[0]
            .trim()
            .toLowerCase() === filter[1]
      );
    case "date":
      return todos.filter(todo => {
        const result = todo.split(";")[1].trim() >= filter[1];
        return result;
      });
    case "sort":
      switch (filter[1].toLowerCase()) {
        case "importance":
          return todos.slice(0).sort((prev, next) => {
            const a = prev.split(";")[2].replace(/[^\!]/g, "");
            const b = next.split(";")[2].replace(/[^\!]/g, "");
            return b.length > a.length ? 1 : -1;
          });
        case "user":
          return todos
            .slice(0)
            .sort((prev, next) => {
              const a = prev.split(";")[0].toLowerCase();
              const b = next.split(";")[0].toLowerCase();
              return a > b ? 1 : -1;
            })
            .sort((prev, next) => {
              const a = prev.split(";")[0];
              const b = next.split(";")[0];
              return a.length === 0 && b.length > 0 ? 1 : -1;
            });
        case "date":
          return todos.slice(0).sort((prev, next) => {
            const a = prev.split(";")[1];
            const b = next.split(";")[1];
            return b > a ? 1 : -1;
          });
        default:
          return todos;
      }

    default:
      return todos;
  }
}

module.exports = {
  filterTodos
};
