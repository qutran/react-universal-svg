import React from 'react';
import { View } from 'react-primitives';
import PropTypes from 'prop-types';
import DOMpurify from 'dompurify';
import SvgBase from './svg.base';
import { NOOP } from './utils';

const transformContent = DOMpurify.sanitize;
const transformSrc = (src) => SvgBase.getModules()[src] || src;

const Svg = (props) => (
  <SvgBase
    {...props}
    transformContent={transformContent}
    transformSrc={transformSrc}
  >
    {({ containerStyle, color, loading, content }) => (
      loading ? <div /> : (
        <View style={containerStyle}>
          <div style={{ color, width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: content }} />
        </View>
      )
    )}
  </SvgBase>
);

Svg.addModules = SvgBase.addModules;

Svg.propTypes = {
  src: PropTypes.string.isRequired,
  onDimensions: PropTypes.func,
  style: PropTypes.object,
};

Svg.defaultProps = {
  style: {},
  onDimensions: NOOP,
};

export default Svg;
