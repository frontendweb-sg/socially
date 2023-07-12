const getError = (name: string, errors: object = {}, touched: object = {}) => {
  return errors?.[name as keyof typeof errors] &&
    touched[name as keyof typeof touched]
    ? errors[name as keyof typeof errors]
    : null;
};

export { getError };
