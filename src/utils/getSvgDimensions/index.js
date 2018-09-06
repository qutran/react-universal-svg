import XMLParser from 'react-xml-parser';

const parser = new XMLParser();

const VIEW_BOX_DIMENSIONS_REGEXP = /^\d+\s\d+\s(\d+\.?[\d])\s(\d+\.?[\d])/;

const getHasWidthHeightAttr = (parsedSvg) => parsedSvg.attributes.width && parsedSvg.attributes.height;
const getDimensionsFromWidthHeightAttr = (parsedSvg) => ({
  width: parseFloat(parsedSvg.attributes.width),
  height: parseFloat(parsedSvg.attributes.height),
});
const getDimensionsFromViewBox = (parsedSvg) => ({
  width: parseFloat(parsedSvg.ATTR.viewbox.toString().replace(VIEW_BOX_DIMENSIONS_REGEXP, '$1')),
  height: parseFloat(parsedSvg.ATTR.viewbox.toString().replace(VIEW_BOX_DIMENSIONS_REGEXP, '$2')),
});

export default (svgString) => {
  const parsedSvg = parser.parseFromString(svgString).getElementsByTagName('svg')[0];
  const isHasWidthHeightAttr = getHasWidthHeightAttr(parsedSvg);
  return isHasWidthHeightAttr
    ? getDimensionsFromWidthHeightAttr(parsedSvg)
    : getDimensionsFromViewBox(parsedSvg);
};
