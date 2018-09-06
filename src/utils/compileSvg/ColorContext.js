import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getShouldColorChangeDetection = (props) => Object.values(props).indexOf('currentColor') >= 0;

const applyColorFromContext = (props, color) => {
  const result = {};
  for (const [key, value] of Object.entries(props)) {
    result[key] = value === 'currentColor' ? color : value;
  }

  return result;
};

const ColorContext = React.createContext('#000');

class ColorConsumer extends Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render () {
    const { children } = this.props;

    if (!getShouldColorChangeDetection(this.props)) {
      return children(this.props);
    }

    return (
      <ColorContext.Consumer>
        {(color) => children(applyColorFromContext(this.props, color))}
      </ColorContext.Consumer>
    );
  }
}

export default {
  Provider: ColorContext.Provider,
  Consumer: ColorConsumer,
};
