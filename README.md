# react-universal-svg

The flexible universal SVG component that renders with DOM and react-native (expo) in an identical way.

# Installation
```npm i --save @kotolis/react-universal-svg```

# Usage
For web, android, ios:
```javascript
import React from 'react';
import Svg from '../../SvgUniversal';

Svg.addModules({
  mock: require('../assets/mock.svg'),
  front: require('../assets/card_front.svg'),
});

const SampleComponentWithForSvg = () => (
  <React.Fragment>
    {/* local svg with color sample */}
    <Svg
      src="mock"
      style={{ color: 'red', width: 100 }}
    />
    {/* local svg with color and params sample */}
    <Svg
      src="front" style={{ color: 'red', width: 100 }}
      params={{a: 'A'}}
    />
    {/* remote svg sample */}
    <Svg
      src="https://upload.wikimedia.org/wikipedia/commons/4/42/Sample-image.svg"
      style={{ width: 100 }}
    />
  </React.Fragment>
);
```
