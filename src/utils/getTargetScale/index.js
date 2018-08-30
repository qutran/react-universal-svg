export default (origin, target) => {
  if (!target.width && !target.height) {
    return 1;
  }

  const baseDimension = target.width ? 'width' : 'height';
  return target[baseDimension] / origin[baseDimension];
};
