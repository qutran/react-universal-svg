import React from 'react';
import { Platform } from 'react-primitives'

export default (() => {
  if (process.env.NODE_ENV === 'production') {
    if (['ios', 'android'].indexOf(Platform.OS) >= 0) {
      return require('./svg.native').default;
    }

    return require('./svg.web').default;
  }

  if (process.env.REACT_APP_ENV === 'development:dom') {
    return import('./starters/dev.dom');
  }

  if (process.env.REACT_APP_ENV === 'development:native') {
    const DevBase = require('./starters/dev.base').default;
    return () => <DevBase loader={import('./starters/dev.native')} />;
  }
})();
