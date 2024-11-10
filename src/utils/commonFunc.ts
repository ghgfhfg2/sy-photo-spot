const equalCheck = (a, b) => {
  let equal = true;
  for (let key in a) {
    if (a[key] !== b[key]) {
      console.log(a[key], b[key]);
      equal = false;
      break;
    }
  }
  return equal;
};

export { equalCheck };
