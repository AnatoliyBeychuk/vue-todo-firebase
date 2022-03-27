export const removeParams = (key) => {
  localStorage.removeItem(key);
};

export const saveParams = (key, param) => {
  if (localStorage.getItem(key) !== param) {
    localStorage.setItem(key, param);
  }
};

export const loadParams = (key, ref) => {
  if (localStorage.getItem(key)) {
    ref.value = localStorage.getItem(key);
  }
};
