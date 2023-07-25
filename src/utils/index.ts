export const getKeyByValue = <T extends unknown, K extends string>(
  object: T,
  value: K
) => {
  return Object.keys(object!).find(
    (key: string) => object[key as keyof T] === value
  );
};
