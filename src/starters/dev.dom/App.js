import React from 'react';
import Svg from '../../svg.web';

Svg.addModules({
  mock: require('../assets/mock.svg'),
});

export default () => (
  <React.Fragment>
    <Svg src="mock" style={{ color: 'red', width: 100 }} />
    <Svg src="https://upload.wikimedia.org/wikipedia/commons/4/42/Sample-image.svg" style={{ width: 100 }} />
  </React.Fragment>
);
