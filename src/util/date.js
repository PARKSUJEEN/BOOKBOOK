export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const getStringDateTime = (date) => {
  return date.toISOString();
};
