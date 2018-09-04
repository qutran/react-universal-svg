import React from 'react';
import DevBase from './starters/dev.base';

export default (() => {
  if (process.env.REACT_APP_ENV === 'development:dom') {
    return import('./starters/dev.dom');
  }

  if (process.env.REACT_APP_ENV === 'development:native') {
    return () => <DevBase loader={import('./starters/dev.native')} />;
  }
})();
