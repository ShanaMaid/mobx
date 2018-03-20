export  const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]' && Array.isArray(arr);
}