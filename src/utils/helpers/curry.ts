export const curry = (fn: Function) =>
  function curried(this: typeof curried, ...args: any[]) {
    // Если кол-во переданных аргументов >= чем у функции есть, то вызвать функцию.
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // Иначе вернуть функцию, в которую можно передать новые аргументы. Она возвращает вызов curried с новыми аргументами.
    return function (this: typeof Function, ...newArgs: any[]) {
      return curried.apply(this, args.concat(newArgs));
    };
  };
