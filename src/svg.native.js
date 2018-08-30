import React from 'react';
import Expo from 'expo';
import { WebView } from 'react-native';
import { View } from 'react-primitives';
import PropTypes from 'prop-types';
import SvgBase from './svg.base';
import { NOOP } from './utils';

const HTML_START = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>html, body {margin:0;padding:0;overflow:hidden;background-color:transparent;color:$color;} svg{position:fixed;top:0;left:0;}</style></head><body>';
const HTML_END = '</body></html>';
const getHtml = (content, color) => `${HTML_START.replace('$color', color)}${content}${HTML_END}`;

const transformSrc = (src) => SvgBase.getModules()[src] ? Expo.Asset.fromModule(SvgBase.getModules()[src]).uri : src;

const Svg = (props) => (
  <SvgBase
    {...props}
    transformSrc={transformSrc}
  >
    {({ containerStyle, color, loading, content }) => (
      loading ? <View /> : (
        <View style={containerStyle} pointerEvents="none">
          <WebView
            source={{ html: getHtml(content, color) }}
            originWhitelist={['*']}
            scrollEnabled={false}
            javaScriptEnabled={false}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      )
    )}
  </SvgBase>
);

Svg.addModules = SvgBase.addModules;

Svg.propTypes = {
  src: PropTypes.string.isRequired,
  onDimensions: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Svg.defaultProps = {
  style: {},
  onDimensions: NOOP,
};

export default Svg;
