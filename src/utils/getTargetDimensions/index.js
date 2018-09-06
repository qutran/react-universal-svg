export default ({ width, height }, scale, style) => {
  const scaleSum = !style.transform ? scale : style.transform.reduce((acc, next) => acc * (next.scale || 1), scale);
  const targetWidth = scaleSum * width;
  const targetHeight = scaleSum * height;
  return {
    width: targetWidth,
    height: targetHeight,
  };
};
