import React from 'react';

const createElement = (name, type) => {
  const SvgElement = (props) => {
    return React.createElement(type, props, props.children);
  };

  SvgElement.displayName = name;

  return SvgElement;
};

const Svg = createElement('Svg', 'svg');

Svg.Circle = createElement('Circle', 'circle');
Svg.ClipPath = createElement('ClipPath', 'clipPath');
Svg.Defs = createElement('Defs', 'defs');
Svg.Ellipse = createElement('Ellipse', 'ellipse');
Svg.G = createElement('G', 'g');
Svg.Line = createElement('Line', 'line');
Svg.LinearGradient = createElement('LinearGradient', 'linearGradient');
Svg.Path = createElement('Path', 'path');
Svg.Polygon = createElement('Polygon', 'polygon');
Svg.Polyline = createElement('Polyline', 'polyline');
Svg.RadialGradient = createElement('RadialGradient', 'radialGradient');
Svg.Rect = createElement('Rect', 'rect');
Svg.Stop = createElement('Stop', 'stop');
Svg.Svg = createElement('Svg', 'svg');
Svg.Symbol = createElement('Symbol', 'symbol');
Svg.Text = createElement('Text', 'text');
Svg.TextPath = createElement('TextPath', 'textPath');
Svg.TSpan = createElement('TSpan', 'tspan');
Svg.Use = createElement('Use', 'use');
Svg.Mask = createElement('Mask', 'mask');

export default Svg;
