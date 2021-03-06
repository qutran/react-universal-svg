import React from 'react';
import { View } from 'react-primitives';
import PropTypes from 'prop-types';
import SvgBase from '../SvgBase';

const UniversalSvg = (props) => (
  <SvgBase {...props}>
    {({ containerStyle, targetDimensions, loading, content }) => (
      loading ? <View /> : (
        <View style={targetDimensions}>
          <View style={containerStyle} pointerEvents="none">
            {content}
          </View>
        </View>
      )
    )}
  </SvgBase>
);

UniversalSvg.addModules = SvgBase.addModules;

UniversalSvg.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  params: PropTypes.object,
};

UniversalSvg.defaultProps = {
  style: {},
  params: {},
};

export default UniversalSvg;
