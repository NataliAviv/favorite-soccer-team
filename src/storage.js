export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = key => {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
};
