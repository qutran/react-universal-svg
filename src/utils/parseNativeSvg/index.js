import React from 'react';
import { Svg } from 'expo';
import pick from 'object.pick';
import XMLParser from 'react-xml-parser';
import toCamelCase from 'camelcase';

const ColorContext = React.createContext('#000');

const parser = new XMLParser();

const normalizeDataName = (tagName, isFirstUpper) => toCamelCase(tagName, { pascalCase: isFirstUpper });

const normalizeKeys = (obj) => {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[normalizeDataName(key)] = value;
  }

  return result;
};

const componentFromName = (name) =>
  name.toLowerCase() === 'svg' ? Svg :
  name.toLowerCase() === 'tspan' ? Svg.TSpan : Svg[normalizeDataName(name, true)] || null;

const extendAttributesWithStyle = (attributes) => {
  if (!attributes.style) {
    return attributes;
  }

  const result = {};
  for (const entry of attributes.style.split(';')) {
    const [key, value] = entry.split(':').map((item) => item.trim());
    result[key] = value;
  }

  return {
    ...attributes,
    ...result,
  }
};

const extendAllowedPropsByUndeclaratedKeys = (Component, allowedProps) => 
  Component.displayName === 'Stop' ? [...allowedProps, 'offset'] : allowedProps;

const getAllowedProps = (Component, attributes) => {
  const keys = Component.propTypes &&
    extendAllowedPropsByUndeclaratedKeys(Component, Object.keys(Component.propTypes));
  return keys ? pick(normalizeKeys(attributes), keys) : attributes;
}

const getShouldColorChangeDetection = (props) => Object.values(props).indexOf('currentColor') >= 0;

const applyColorFromContext = (props, color) => {
  const result = {};
  for (const [key, value] of Object.entries(props)) {
    result[normalizeDataName(key)] = value === 'currentColor' ? color : value;
  }

  return result;
};

export const ColorProvider = ColorContext.Provider;

export default (content) => {

  const parsedSvg = parser.parseFromString(content).getElementsByTagName('svg')[0];

  const renderChildren = (tree) => [tree.value, ...tree.children]
    .filter((item) => !!item)
    .map((item, key) => typeof item === 'string' ? item : compileTree(item, key))

  const compileTree = (tree, key) => {
    const Component = componentFromName(tree.name);

    if (!Component) {
      return null;
    }

    const props = getAllowedProps(Component, extendAttributesWithStyle(tree.attributes));
    const shouldColorChangeDetection = getShouldColorChangeDetection(props);

    if (shouldColorChangeDetection) {
      return (
        <ColorContext.Consumer key={key}>
          {(color) => (
            <Component {...applyColorFromContext(props, color)}>
              {renderChildren(tree)}
            </Component>
          )}
        </ColorContext.Consumer>
      );
    }

    return (
      <Component {...props} key={key}>
        {renderChildren(tree)}
      </Component>
    );
  };

  return compileTree(parsedSvg, 'svg');
};
