import React from 'react';
import Expo from 'expo';
import { View } from 'react-primitives';
import PropTypes from 'prop-types';
import SvgBase from '../svg.base';
import { NOOP } from '../utils';
import parseNativeSvg, { ColorProvider } from '../utils/parseNativeSvg';

const transformSrc = (src) => SvgBase.getModules()[src] ? Expo.Asset.fromModule(SvgBase.getModules()[src]).uri : src;

const SvgNative = (props) => (
  <SvgBase
    {...props}
    transformSrc={transformSrc}
  >
    {({ containerStyle, targetDimensions, color, loading, content }) => (
      loading ? <View /> : (
        <View style={targetDimensions}>
          <View style={containerStyle} pointerEvents="none">
            <ColorProvider value={color}>
              {parseNativeSvg(content)}
            </ColorProvider>
          </View>
        </View>
      )
    )}
  </SvgBase>
);

SvgNative.addModules = SvgBase.addModules;

SvgNative.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  params: PropTypes.object,
  onDimensions: PropTypes.func,
};

SvgNative.defaultProps = {
  style: {},
  params: {},
  onDimensions: NOOP,
};

export default SvgNative;
