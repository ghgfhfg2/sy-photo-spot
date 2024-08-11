type GenericObject = { [key: string]: any };

const equalCheck = (a: GenericObject, b: GenericObject): boolean => {
  let equal = true;
  for (let key in a) {
    if (a[key] !== b[key]) {
      equal = false;
      break;
    }
  }
  return equal;
};

export { equalCheck };
