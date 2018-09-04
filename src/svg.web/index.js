import React from 'react';
import { View } from 'react-primitives';
import PropTypes from 'prop-types';
import DOMpurify from 'dompurify';
import SvgBase from '../svg.base';
import { NOOP } from '../utils';

const transformContent = DOMpurify.sanitize;
const transformSrc = (src) => SvgBase.getModules()[src] || src;

const SvgWeb = (props) => (
  <SvgBase
    {...props}
    transformContent={transformContent}
    transformSrc={transformSrc}
  >
    {({ containerStyle, targetDimensions, color, loading, content }) => (
      loading ? <View /> : (
        <View style={targetDimensions}>
          <View style={containerStyle}>
            <div style={{ color, width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: content }} />
          </View>
        </View>
      )
    )}
  </SvgBase>
);

SvgWeb.addModules = SvgBase.addModules;

SvgWeb.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  params: PropTypes.object,
  onDimensions: PropTypes.func,
};

SvgWeb.defaultProps = {
  style: {},
  params: {},
  onDimensions: NOOP,
};

export default SvgWeb;
