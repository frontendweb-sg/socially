export const getKeyByValue = <T extends unknown, K extends string>(
  object: T,
  value: K
) => {
  return Object.keys(object!).find(
    (key: string) => object[key as keyof T] === value
  );
};

export const toBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
