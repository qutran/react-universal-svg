import React from 'react';
import XMLParser from 'react-xml-parser';
import toCamelCase from 'camelcase';
import Svg from '../../SvgComponent';
import ColorContext from './ColorContext';
import ParamsContext from './ParamsContext';
import { omit, pick } from '..';

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

const getAllowedProps = (Component, attributes) => {
  const keys = Component.propTypes && Object.keys(Component.propTypes);
  const xLinkHrefKey = Object.keys(attributes).find(key => key.toLowerCase() === 'xlink:href');
  if (xLinkHrefKey) {
    attributes.href = attributes[xLinkHrefKey];
  }
  return keys ? pick(normalizeKeys(attributes), keys) : attributes;
}

export const ColorProvider = ColorContext.Provider;
export const ParamsProvider = ParamsContext.Provider;

export default (content) => {

  const parsedSvg = parser.parseFromString(content).getElementsByTagName('svg')[0];

  const renderChildren = (children, value) => [value, ...children]
    .filter((item) => !!item)
    .map((item, key) => typeof item === 'string' ? item : compileTree(item, key))

  const compileTree = (tree, key) => {
    const Component = componentFromName(tree.name);

    if (!Component) {
      return null;
    }

    console.log(tree.attributes);

    const props = getAllowedProps(Component, extendAttributesWithStyle(tree.attributes));
    props.value = tree.value;

    return (
      <ColorContext.Consumer {...props} key={key}>
        {(props) => (
          <ParamsContext.Consumer {...omit(props, ['children'])}>
            {(props) => (
              <Component {...omit(props, ['value', 'children'])} index={key}>
                {renderChildren(tree.children, props.value)}
              </Component>
            )}
          </ParamsContext.Consumer>
        )}
      </ColorContext.Consumer>
    );
  };

  return compileTree(parsedSvg, 'svg');
};
