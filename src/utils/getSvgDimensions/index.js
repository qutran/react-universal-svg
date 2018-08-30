import { parseString } from 'xml2js';

const VIEW_BOX_DIMENSIONS_REGEXP = /^\d+\s\d+\s(\d+\.?[\d])\s(\d+\.?[\d])/;
const attrToLowerCase = (attr) => attr.toLowerCase();
const getHasWidthHeightAttr = (parsedSvg) => parsedSvg.ATTR.width && parsedSvg.ATTR.height;
const getDimensionsFromWidthHeightAttr = (parsedSvg) => ({
  width: parseFloat(parsedSvg.ATTR.width),
  height: parseFloat(parsedSvg.ATTR.height),
});
const getDimensionsFromViewBox = (parsedSvg) => ({
  width: parseFloat(parsedSvg.ATTR.viewbox.toString().replace(VIEW_BOX_DIMENSIONS_REGEXP, '$1')),
  height: parseFloat(parsedSvg.ATTR.viewbox.toString().replace(VIEW_BOX_DIMENSIONS_REGEXP, '$2')),
});

const parserOptions = { strict: false, attrkey: 'ATTR', attrNameProcessors: [attrToLowerCase] };

export default (svgString) => {
  return new Promise((resolve, reject) => {
    parseString(svgString, parserOptions, (err, parsedXml) => {

      if (err) {
        reject(err);
      }

      const parsedSvg = parsedXml.SVG;
      const isHasWidthHeightAttr = getHasWidthHeightAttr(parsedSvg);
      
      resolve(
        isHasWidthHeightAttr
          ? getDimensionsFromWidthHeightAttr(parsedSvg)
          : getDimensionsFromViewBox(parsedSvg)
      );
    });
  });
};
