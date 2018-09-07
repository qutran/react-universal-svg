import React from 'react';
import Svg from '../../SvgUniversal';

Svg.addModules({
  mock: require('../assets/mock.svg'),
  front: require('../assets/card_front.svg'),
  back: require('../assets/card_back.svg'),
});

export default () => (
  <React.Fragment>
    <Svg src="mock" style={{ color: 'red', width: 100 }} />
    <Svg src="front" style={{ color: 'red', width: 100 }} params={{a: 'A'}} />
    <Svg src="back" style={{ color: 'red', width: 100 }} />
    <Svg src="https://upload.wikimedia.org/wikipedia/commons/4/42/Sample-image.svg" style={{ width: 100 }} />
  </React.Fragment>
);
