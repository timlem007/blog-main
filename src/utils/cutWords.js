const cutWords = (str) => {
  const arr = str.split(' ');
  arr.splice(25);
  return `${arr.join(' ')} ...`;
};

export default cutWords;
