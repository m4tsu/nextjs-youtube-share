export const assertUnexpectedValue = (x: never): never => {
  throw new Error(`Unexpected value!! ${x}`);
};
