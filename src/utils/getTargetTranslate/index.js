import getTargetDimensions from '../getTargetDimensions';

export default (originDimensions, scale, style) => {
  const { width, height } = originDimensions;
  const { width: targetWidth, height: targetHeight } = getTargetDimensions(originDimensions, scale, style);
  return [{ translateX: (targetWidth - width) / 2 }, { translateY: (targetHeight - height) / 2 }];
};
