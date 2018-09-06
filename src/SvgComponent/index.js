import Svg from './svg';
import PropTypes from 'prop-types';
import setupGradient from './Gradient';
import Stop from './Gradient/Stop';

Svg.LinearGradient = setupGradient(Svg.LinearGradient, Svg.Stop);
Svg.RadialGradient = setupGradient(Svg.RadialGradient, Svg.Stop);
Svg.Stop = Stop;

const NUMBER_STRING = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const commonProps = {
  fill: PropTypes.string,
  fillOpacity: NUMBER_STRING,
  fillRule: PropTypes.oneOf(['nonzero', 'evenodd']),
  opacity: NUMBER_STRING,
  stroke: PropTypes.string,
  strokeWidth: NUMBER_STRING,
  strokeOpacity: NUMBER_STRING,
  strokeLinecap: PropTypes.string,
  strokeLineJoin: PropTypes.string,
  strokeDasharray: PropTypes.any,
  strokeDashoffset: PropTypes.any,
  x: NUMBER_STRING,
  y: NUMBER_STRING,
  rotate: NUMBER_STRING,
  rotation: NUMBER_STRING,
  scale: NUMBER_STRING,
  transform: PropTypes.string,
  origin: NUMBER_STRING,
  originX: NUMBER_STRING,
  originY: NUMBER_STRING,
  id: PropTypes.string,
};

Svg.propTypes = {
  width: NUMBER_STRING,
  height: NUMBER_STRING,
  viewBox: PropTypes.string,
};

Svg.Circle.propTypes = {
  ...commonProps,
  cx: NUMBER_STRING,
  cy: NUMBER_STRING,
  r: NUMBER_STRING,
};

Svg.ClipPath.propTypes = {
  ...commonProps,
};

Svg.Defs.propTypes = {};

Svg.Ellipse.propTypes = {
  ...commonProps,
  cx: NUMBER_STRING,
  cy: NUMBER_STRING,
  rx: NUMBER_STRING,
  ry: NUMBER_STRING,
};

Svg.G.propTypes = {
  ...commonProps,
};

Svg.Line.propTypes = {
  ...commonProps,
  x1: NUMBER_STRING,
  y1: NUMBER_STRING,
  x2: NUMBER_STRING,
  y2: NUMBER_STRING,
};

Svg.LinearGradient.propTypes = {
  ...commonProps,
  x1: NUMBER_STRING,
  y1: NUMBER_STRING,
  x2: NUMBER_STRING,
  y2: NUMBER_STRING,
};

Svg.Path.propTypes = {
  ...commonProps,
  d: PropTypes.string,
};

Svg.Polygon.propTypes = {
  ...commonProps,
  points: PropTypes.string,
};

Svg.Polyline.propTypes = {
  ...commonProps,
  points: PropTypes.string,
};

Svg.RadialGradient.propTypes = {
  ...commonProps,
  cx: NUMBER_STRING,
  cy: NUMBER_STRING,
  rx: NUMBER_STRING,
  ry: NUMBER_STRING,
  fx: NUMBER_STRING,
  fy: NUMBER_STRING,
  gradientUnits: PropTypes.string,
};

Svg.Rect.propTypes = {
  ...commonProps,
  width: NUMBER_STRING,
  height: NUMBER_STRING,
  rx: NUMBER_STRING,
};

Svg.Stop.propTypes = {
  ...commonProps,
  offset: NUMBER_STRING,
  stopColor: NUMBER_STRING,
  stopOpacity: NUMBER_STRING,
};

Svg.Symbol.propTypes = {
  ...commonProps,
  ...Svg.propTypes,
};

Svg.Text.propTypes = {
  ...commonProps,
  textAnchor: PropTypes.string,
  fontSize: NUMBER_STRING,
  fontWeight: PropTypes.string,
};

Svg.TextPath.propTypes = {
  ...commonProps,
  href: PropTypes.string,
  startOffset: PropTypes.string,
};

Svg.TSpan.propTypes = {
  ...commonProps,
  dx: PropTypes.string,
  dy: PropTypes.string,
};

Svg.Use.propTypes = {
  ...commonProps,
  href: PropTypes.string,
  x: NUMBER_STRING,
  y: NUMBER_STRING,
  width: NUMBER_STRING,
  height: NUMBER_STRING,
};

export default Svg;
