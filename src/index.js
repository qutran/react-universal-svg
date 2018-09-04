import React from 'react';

export default (() => {
  if (process.env.REACT_APP_ENV === 'development:dom') {
    return import('./starters/dev.dom');
  }

  if (process.env.REACT_APP_ENV === 'development:native') {
    const DevBase = require('./starters/dev.base').default;
    return () => <DevBase loader={import('./starters/dev.native')} />;
  }
})();
