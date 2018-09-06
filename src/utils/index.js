export const omit = (input, keys) => {
  const result = {...input};
  for (const key of keys) {
    delete result[key];
  }
  return result;
};

export const pick = (input, keys) => {
  if (!input) {
    return {};
  }

  const result = {};
  for (const key of keys) {
    if (key in input) {
      result[key] = input[key];
    }
  }
  return result;
};
