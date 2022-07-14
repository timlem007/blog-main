export const toLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data.user));
};
